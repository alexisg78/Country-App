import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service.js';
import { Country } from '../../interfaces/country.js';

@Component({
  selector: 'app-by-capital-pages',
  templateUrl: './by-capital-pages.component.html',
  styles: ``
})
export class ByCapitalPagesComponent {

  public countries: Country[]= [];
  public isLoading: boolean = false;

  constructor( private CountriesService: CountriesService ) {}

  searchByCapital( term : string ) :void {

    this.isLoading= true;

    this.CountriesService.searchByCapital( term )
      .subscribe( countries =>{
        this.countries= countries;
        this.isLoading= false;
      });
  }
}
