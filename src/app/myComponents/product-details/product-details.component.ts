import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, product } from 'src/app/model/datatypes';
import { ApiService } from 'src/app/myServices/api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product;
  productQuantity: number = 1;
  removeCart = false;
  cartData: product | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((param) => {
      let productId = param.get('productId');
      // console.log(productId);
      productId &&
        this.api.getProductById(productId).subscribe((res) => {
          // console.log(res);
          this.productData = res;

          let cartData = localStorage.getItem('localCart');
          if (productId && cartData) {
            let items = JSON.parse(cartData);
            items = items.filter((item: product) => {
              return productId == item.id.toString();
            });
            if (items.length) {
              this.removeCart = true;
            } else {
              this.removeCart = false;
            }
          }
          let user = localStorage.getItem('user');
          if (user) {
            let userId = user && JSON.parse(user).id;
            this.api.getCartList(userId);
            this.api.cartData.subscribe((result) => {
              let item = result.filter(
                (item: product) => {
                  productId?.toString() === item.productId?.toString();
                }
              );
              if (item.length) {
                this.cartData = item[0];
                this.removeCart = true;
              }
            });
          }
        });
    });
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 10 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        //user is not logged in
        // console.log(this.productData);
        this.api.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        // console.log('user is logged in'); //user is logged in
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        // console.log(userId);
        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        };
        delete cartData.id;
        // console.warn(cartData);
        this.api.addToCart(cartData).subscribe((result) => {
          if (result) {
            // alert("product is added in cart");
            this.api.getCartList(userId);
            this.removeCart = true;
          }
        });
      }
    }
  }

  removeFromCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.api.removeItemFromCart(productId);
      this.removeCart = false;
    } else {
      // console.log(this.cartData);
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      this.cartData &&
        this.api.removeFromCart(this.cartData.id).subscribe((result) => {
          if (result) {
            this.api.getCartList(userId);
          }
        });
      this.removeCart = false;
    }
  }
}
