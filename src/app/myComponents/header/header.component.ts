import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/myServices/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  totalItems: number = 0;

  constructor(private cartService: CartService) { }
  
  ngOnInit() {
    this.cartService.getProducts().subscribe((res) => {
      this.totalItems = res.length;
    });
  }
}
