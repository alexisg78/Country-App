import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service.js';
import { Country } from '../../interfaces/country.interface.js';

@Component({
  selector: 'app-by-country-pages',
  templateUrl: './by-country-pages.component.html',
  styles: ``
})
export class ByCountryPagesComponent implements OnInit {

  public countries: Country[]= [];
  public isLoading:boolean = false;
  public initialValue: string = '';

  ngOnInit(): void {
    this.countries= this.countriesService.cacheStore.byCountries.countries
    this.initialValue= this.countriesService.cacheStore.byCountries.term
  }

  constructor( private countriesService: CountriesService ){}

  searchCountry( term: string ): void {
    this.isLoading= true;
    this.countriesService.searchCountry( term )
    .subscribe( countries => {
      this.countries= countries;
      this.isLoading= false;
      });
  }
}
