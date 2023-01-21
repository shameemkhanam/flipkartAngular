import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/myServices/api.service';
import { CartService } from 'src/app/myServices/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public productList: any;

  constructor(private apiService: ApiService, private cartService: CartService) {}

  ngOnInit() {
    this.apiService.getProducts().subscribe((res) => {
      this.productList = res;

      this.productList.forEach((a:any) => {
        Object.assign(a, { quantity: 1, total: a.price });
      });
    });
  }

  addtocart(productItem:any) {
    this.cartService.addToCart(productItem);
  }
}
