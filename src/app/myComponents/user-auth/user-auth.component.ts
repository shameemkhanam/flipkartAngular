import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { cart, login, product, signup } from 'src/app/model/datatypes';
import { ApiService } from 'src/app/myServices/api.service';
import { UserService } from 'src/app/myServices/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {

  showLogin: boolean = true;
  authError: string = '';

  user!: SocialUser;

  constructor(private userService: UserService, private api: ApiService, private authService:SocialAuthService) {}

  ngOnInit() {
    this.userService.userAuthReload();

    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  signInWithGoogle():any {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  signOut(): any{
    this.authService.signOut();
  }

  signup(data: signup) {
    // console.log(data);
    this.userService.userSignup(data);
  }

  login(data: login) {
    // console.log(data);
    this.userService.userLogin(data);
    this.userService.invalidUserAuth.subscribe((res) => {
      // console.log("apple",res);
      if (res) {
        this.authError = "User not found..";
      }
      else {
        this.localCartToRemoteCart();
      }      
    });
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignup() {
    this.showLogin = false;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse('user').id;
    if (data) {
      let cartDataList:product[] = JSON.parse(data);
      

      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        };
        delete cartData.id;
        setTimeout(() => {
          this.api.addToCart(cartData).subscribe((res) => {
            if (res) {
              console.log('item stored in db');
            }
          });
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        }, 500);
        
      });
    }

    setTimeout(() => {
      this.api.getCartList(userId);
    },2000);
    
  }
}
