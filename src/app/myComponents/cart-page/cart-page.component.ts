import { Component, OnInit } from '@angular/core';
import { cart, priceSummary } from 'src/app/model/datatypes';
import { ApiService } from 'src/app/myServices/api.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartData: cart[]  =[];
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.currentCart().subscribe((result) => {
      // console.log(result);
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
      // console.log(price);
      this.priceSummary.price = +price.toFixed(2);
      this.priceSummary.discount = +(price / 10).toFixed(2);
      this.priceSummary.tax = +(price / 10).toFixed(2);
      this.priceSummary.delivery = 100;
      this.priceSummary.total =
        price + price / 10 + 100 - this.priceSummary.tax;
      this.priceSummary.total = +this.priceSummary.total.toFixed(2);
      console.log(this.priceSummary);
    });
  }
}
