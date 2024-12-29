import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.js';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiUrl= 'https://restcountries.com/v3.1';

  private getCountriesRequest( url: string): Observable<Country[]>{
    return this.http.get<Country[]>( url )
    .pipe(
      catchError( () => of( [] ) ),
      //delay( 2000 )
    )
  }

  constructor(private http: HttpClient) { }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {

    const url= `${ this.apiUrl }/alpha/${ code }`

    // nota: el map dentro del pipe es necesario, porque todas las api devuelven un arreglo
    // Es por eso que debo transformar el arreglo en un solo elemento o devolver null
    return this.http.get<Country[]>(url)
      .pipe(
        map( countries => countries.length > 0 ? countries[0] : null ),
        catchError( () => of( null ) )
      );
  }

  searchByCapital( term: string ): Observable<Country[]> {
    const url= `${ this.apiUrl }/capital/${ term }`
    // Antes:
    // return this.http.get<Country[]>(url)
    //   .pipe(
    //     catchError( () => of( [] ) )
    //   );

    // Refactorizando:
    return this.getCountriesRequest( url );
  }

  searchCountry( term: string ): Observable<Country[]> {
    const url= `${ this.apiUrl }/name/${ term }`
    return this.getCountriesRequest( url );
  }

  searchRegion( term: string ): Observable<Country[]> {
    const url= `${ this.apiUrl }/region/${ term }`
    return this.getCountriesRequest( url );
  }
}
