import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/model/product';
import { ApiService } from 'src/app/myServices/api.service';
import { CartService } from 'src/app/myServices/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  productList: undefined | product[];

  constructor(private apiService: ApiService, private cartService: CartService) {}

  ngOnInit() {
    this.apiService.getProducts().subscribe((res) => {
      this.productList = res;

      this.productList.forEach((a:any) => {
        Object.assign(a, { quantity: 1, total: a.price });
      });
    });
  }

  // ngOnInit(): void {
  //   this.apiService.getProducts().subscribe((res) => {
  //     // console.log(res);
  //     this.productList = res;      
  //   });
  // }

  addtocart(productItem:any) {
    this.cartService.addToCart(productItem);
  }
}
