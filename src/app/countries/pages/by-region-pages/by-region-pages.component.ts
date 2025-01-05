import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface.js';
import { CountriesService } from '../../services/countries.service.js';
import { Region } from '../../interfaces/region-type.interface.js';

//type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

@Component({
  selector: 'app-by-region-pages',
  templateUrl: './by-region-pages.component.html',
  styles: ``
})
export class ByRegionPagesComponent implements OnInit {
  public countries: Country[]= [];
  public isLoading:boolean = false;
  public regions: Region[] = ['Africa' , 'Americas' , 'Asia' , 'Europe' , 'Oceania']
  public selectedRegion?: Region;

  ngOnInit(): void {
    this.countries= this.countriesService.cacheStore.byRegion.countries
    this.selectedRegion= this.countriesService.cacheStore.byRegion.region
  }

  constructor( private countriesService: CountriesService){}

  searchRegion( region: Region ): void {
    this.isLoading= true;
    this.selectedRegion= region;

    this.countriesService.searchRegion( region )
      .subscribe( countries => {
        this.countries= countries;
        this.isLoading= false;
      })
  }
}
