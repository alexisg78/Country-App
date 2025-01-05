import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { Country } from '../interfaces/country.interface.js';
import { CacheStore } from '../interfaces/cache-store.interface.js';
import { Region } from '../interfaces/region-type.interface.js';

@Injectable({providedIn: 'root'})
export class CountriesService  {

  public cacheStore: CacheStore = {
    byCapital:   { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion:    { region: '', countries: [] },
  }

  private apiUrl= 'https://restcountries.com/v3.1';

  private getCountriesRequest( url: string): Observable<Country[]>{
    return this.http.get<Country[]>( url )
    .pipe(
      catchError( () => of( [] ) ),
      //delay( 2000 )
    )
  }

  private saveToLocalStorage () {
    localStorage.setItem('cacheStore', JSON.stringify( this.cacheStore ) );
  }

  private loadFromLocalStorage () {
    if ( !localStorage.getItem( 'cacheStore' ) ) return;

    this.cacheStore= JSON.parse( localStorage.getItem( 'cacheStore' )! )

  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
   }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {
    const url= `${ this.apiUrl }/alpha/${ code }`;
    // nota: el map dentro del pipe es necesario, porque todas las api devuelven un arreglo
    // Es por eso que debo transformar el arreglo en un solo elemento o devolver null
    return this.http.get<Country[]>(url)
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null ),
        catchError( () => of( null ) )
      );
  }

  searchByCapital( term: string ): Observable<Country[]> {
    const url= `${ this.apiUrl }/capital/${ term }`;
    return this.getCountriesRequest( url )
      .pipe(
        tap( countries => this.cacheStore.byCapital = { term, countries } ),
        tap( () => this.saveToLocalStorage() ),
      )
  }

  searchCountry( term: string ): Observable<Country[]> {
    const url= `${ this.apiUrl }/name/${ term }`;
    return this.getCountriesRequest( url )
      .pipe(
        tap( countries => this.cacheStore.byCountries= { term, countries } ),
        tap( () => this.saveToLocalStorage() ),
      )
  }

  searchRegion( region: Region ): Observable<Country[]> {
    const url= `${ this.apiUrl }/region/${ region }`;
    return this.getCountriesRequest( url )
    .pipe(
      tap( countries => this.cacheStore.byRegion= { region, countries } ),
      tap( () => this.saveToLocalStorage() ),
    )
  }
}
