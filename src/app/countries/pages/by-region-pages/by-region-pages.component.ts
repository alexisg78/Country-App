import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.js';
import { CountriesService } from '../../services/countries.service.js';

@Component({
  selector: 'app-by-region-pages',
  templateUrl: './by-region-pages.component.html',
  styles: ``
})
export class ByRegionPagesComponent {

  public countries: Country[]= [];
  public isLoading:boolean = false;

  constructor( private countriesService: CountriesService){}

  searchRegion( region:string ): void {

    this.isLoading= true;

    this.countriesService.searchRegion( region )
      .subscribe( countries => {
        this.countries= countries;
        this.isLoading= false;
      })
  }
}
