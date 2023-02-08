import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/model/datatypes';
import { ApiService } from 'src/app/myServices/api.service';
import { CartService } from 'src/app/myServices/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productList: undefined | product[];
  filterCategory: undefined | product[];

  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) {}  

  ngOnInit(): void {   

    
  }

  filter(categorypro: product[]) {
    // console.log(categorypro);
    this.filterCategory = categorypro;
    
  }

  
}
