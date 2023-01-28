import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs';
import { product } from 'src/app/model/datatypes';
import { ApiService } from 'src/app/myServices/api.service';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.css'],
})
export class TopProductsComponent {
  popularProducts: undefined | product[];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api
      .popularProducts()
      .pipe(take(3))
      .subscribe((data) => {
        // console.log(data);
        this.popularProducts = data;
      });
  }
}
