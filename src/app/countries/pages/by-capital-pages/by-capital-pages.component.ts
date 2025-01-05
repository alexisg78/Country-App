import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service.js';
import { Country } from '../../interfaces/country.interface.js';

@Component({
  selector: 'app-by-capital-pages',
  templateUrl: './by-capital-pages.component.html',
  styles: ``
})
export class ByCapitalPagesComponent implements OnInit {

  public countries: Country[]= [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  ngOnInit(): void {
    this.countries = this.CountriesService.cacheStore.byCapital.countries;
    this.initialValue= this.CountriesService.cacheStore.byCapital.term;
  }

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
