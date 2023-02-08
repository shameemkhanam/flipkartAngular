import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { product } from 'src/app/model/datatypes';
import { ApiService } from 'src/app/myServices/api.service';

@Component({
  selector: 'app-card-top',
  templateUrl: './card-top.component.html',
  styleUrls: ['./card-top.component.css'],
})
export class CardTopComponent implements OnInit {
  productList: undefined | product[];
  filterCategory: undefined | product[];
  @Output() customEvent = new EventEmitter();
  

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getProducts().subscribe((res) => {
      // console.log(res);
    });

    this.apiService.getProducts().subscribe((res) => {
      // console.log(res);
      this.productList = res;
      this.filterCategory = res;

      this.productList.forEach((a: any) => {
        if (
          a.category === "women's clothing" ||
          a.category === "men's clothing"
        ) {
          a.category = 'fashion';
        }
      });
    });
  }

  filter(category: string) {
    
    this.filterCategory = this.productList?.filter((a: any) => {
      if (a.category == category || category == '') {
        return a;
      }
    });
    // console.log(this.filterCategory);
    this.customEvent.emit(this.filterCategory);
  }
}
