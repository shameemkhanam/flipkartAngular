import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/myServices/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  public productList: any;

  constructor(private apiService: ApiService) { }
  
  ngOnInit() {
    this.apiService.getProducts().subscribe((res) => {
      this.productList = res;
    })
  }
}
