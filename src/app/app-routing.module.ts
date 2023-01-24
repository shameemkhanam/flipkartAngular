import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './myComponents/cart/cart.component';
import { HomeComponent } from './myComponents/home/home.component';
import { PageNotFoundComponent } from './myComponents/page-not-found/page-not-found.component';
import { ProductsComponent } from './myComponents/products/products.component';
import { SearchComponent } from './myComponents/search/search.component';
import { SellerComponent } from './myComponents/seller/seller.component';

const routes: Routes = [
  {path:'', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'seller', component: SellerComponent},
  {path: 'cart', component: CartComponent},
  {path: 'search/:query', component: SearchComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
