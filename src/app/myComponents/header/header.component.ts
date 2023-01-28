import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from 'src/app/model/datatypes';
import { ApiService } from 'src/app/myServices/api.service';
import { CartService } from 'src/app/myServices/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartItems: number = 0;
  searchResult: undefined | product[];
  username: string = "";
  menuType: string = 'default';

  constructor(
    private cartService: CartService,
    private api: ApiService,
    private route: Router
  ) {}

  ngOnInit() {
    // this.cartService.getProducts().subscribe((res) => {
    //   this.totalItems = res.length;
    // });

    this.route.events.subscribe((val: any) => {
      // console.log(val.url);
      
      if (val.url) {
        if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.username = userData.name;
          this.menuType = 'user';
        }
        else {
          this.menuType = 'default';
        }
      }
      
    });

    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
    this.api.cartData.subscribe((items) => {
      this.cartItems = items.length;
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

  redirectToDetails(id: number) {
    this.route.navigate([`/details/${id}`]);
  }

  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
  }
}
