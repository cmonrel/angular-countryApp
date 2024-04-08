import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';

import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public regions: Region[] = ['Europe', 'Americas', 'Asia', 'Africa', 'Oceania'];
  public selectedRegion?: Region;

  constructor(private countriesService: CountriesService) { }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  public searchByRegion (term: Region): void {

    this.selectedRegion = term;
    this.isLoading = true;
    this.countriesService.searchByRegion(term)
    .subscribe(countries => {

      this.countries = countries;
      this.isLoading = false;
    });
  }
}
