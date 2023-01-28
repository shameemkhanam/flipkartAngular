import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/app/model/datatypes';
import { ApiService } from 'src/app/myServices/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchResult: undefined | product[];
  noSearchResult = false;
  searchedQuery: string | undefined | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit() {
    // let query = this.activatedRoute.snapshot.paramMap.get('query');
    // console.log(query);
    this.activatedRoute.paramMap.subscribe((param) => {
      let query = param.get('query');
      console.log(query);
      query &&
        this.api.searchProducts(query).subscribe((res) => {
          this.searchResult = res;
          if (this.searchResult.length < 1) {
            this.noSearchResult = true;
            this.searchedQuery = query;
          }
        });
    });
  }
}
