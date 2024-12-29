import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service.js';
import { Country } from '../../interfaces/country.js';

@Component({
  selector: 'app-by-country-pages',
  templateUrl: './by-country-pages.component.html',
  styles: ``
})
export class ByCountryPagesComponent {

  public countries: Country[]= [];
  public isLoading:boolean = false;

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
