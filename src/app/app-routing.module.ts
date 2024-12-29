import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './shared/pages/home-Page/home-Page.component.js';
import { AboutPageComponent } from './shared/pages/about-Page/about-Page.component.js';
import { ContactPageComponent } from './shared/pages/contact-Page/contact-Page.component.js';


const routes: Routes = [
  // {
  //   path: '',
  //   component: HomePageComponent
  // },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'countries',
    loadChildren: ()=> import('./countries/countries.module').then(m => m.CountriesModule)
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: '**',
    redirectTo: 'countries'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
