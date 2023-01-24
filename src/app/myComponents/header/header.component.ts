import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from 'src/app/model/product';
import { ApiService } from 'src/app/myServices/api.service';
import { CartService } from 'src/app/myServices/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  totalItems: number = 0;
  searchResult: undefined | product[];

  constructor(private cartService: CartService, private api: ApiService, private route: Router) {}

  ngOnInit() {
    this.cartService.getProducts().subscribe((res) => {
      this.totalItems = res.length;
    });
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      // console.log(element.value);
      this.api.searchProducts(element.value).subscribe((res) => {
        // console.log(res);
        if (res.length > 5) {
          res.length = 5;
        }
        this.searchResult = res;
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(value: string) {
    // console.log(value);
    this.route.navigate([`search/${value}`]);
  }
}
