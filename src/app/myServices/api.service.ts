import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { cart, product } from '../model/datatypes';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  cartData = new EventEmitter<product[] | []>();

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<product[]>('http://localhost:3000/products').pipe(
      map((res) => {
        return res;
      })
    );
  }

  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }

  searchProducts(query: string) {
    return this.http.get<product[]>(
      `http://localhost:3000/products?q=${query}`
    );
  }

  getProductById(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  localAddToCart(data:product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
    }
    else {
      // console.log('else');
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeItemFromCart(productId:number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => {
        return productId !== item.id;
      });
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(userId: number) {
    return this.http.get<product[]>('http://localhost:3000/cart?userId=' + userId,
      { observe: 'response' }).subscribe((result) => {
        console.log(result);
        
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }
}
