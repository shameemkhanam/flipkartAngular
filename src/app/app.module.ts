import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './myComponents/header/header.component';
import { FooterComponent } from './myComponents/footer/footer.component';
import { CartComponent } from './myComponents/cart/cart.component';
import { ProductsComponent } from './myComponents/products/products.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './myComponents/home/home.component';
import { SellerComponent } from './myComponents/seller/seller.component';
import { CardTopComponent } from './myComponents/card-top/card-top.component';
import { PageNotFoundComponent } from './myComponents/page-not-found/page-not-found.component'
import { FormsModule } from '@angular/forms';
import { SliderComponent } from './myComponents/slider/slider.component';
import { TopProductsComponent } from './myComponents/top-products/top-products.component';
import { SearchComponent } from './myComponents/search/search.component';
import { ProductDetailsComponent } from './myComponents/product-details/product-details.component';
import { UserAuthComponent } from './myComponents/user-auth/user-auth.component';
import { MyHeaderInterceptor } from './myServices/my-header.interceptor';
import { CartPageComponent } from './myComponents/cart-page/cart-page.component';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    ProductsComponent,
    HomeComponent,
    SellerComponent,
    CardTopComponent,
    PageNotFoundComponent,
    SliderComponent,
    TopProductsComponent,
    SearchComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    CartPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    SocialLoginModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHeaderInterceptor,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '463057302332-ois231temvdiq2mr0d9fl6hu8jdgf01t.apps.googleusercontent.com'
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
