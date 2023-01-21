import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/myServices/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  products: any = [];
  grandTotal: number = 0;

  constructor(private cartService: CartService) { }
  
  ngOnInit() {
    this.cartService.getProducts()
      .subscribe((res) => {
        this.products = res;
        this.grandTotal = this.cartService.getTotalPrice();
    });
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

  emptyCart() {
    this.cartService.removeAllCart();
  }
}
