import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CountriesRoutingModule } from './countries-routing.module';
import { SharedModule } from "../shared/shared.module";

import { ByCapitalPagesComponent } from './pages/by-capital-pages/by-capital-pages.component';
import { ByCountryPagesComponent } from './pages/by-country-pages/by-country-pages.component';
import { ByRegionPagesComponent } from './pages/by-region-pages/by-region-pages.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';
import { CountryTableComponent } from './components/country-table/country-table.component.js';




@NgModule({
  declarations: [
    ByCapitalPagesComponent,
    ByCountryPagesComponent,
    ByRegionPagesComponent,
    CountryPageComponent,
    CountryTableComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    SharedModule
],
})
export class CountriesModule { }
