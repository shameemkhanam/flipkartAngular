import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { login, signup } from '../model/datatypes';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  invalidUserAuth = new EventEmitter<boolean>(false);

  constructor(private http:HttpClient, private router: Router) { }

  userSignup(user: signup) {
    // console.log(user);
    this.http.post('http://localhost:3000/users', user, { observe: 'response' })
      .subscribe((res) => {
        console.log(res);
        if (res) { //if we will get the result...
          localStorage.setItem('user', JSON.stringify(res.body));
          this.router.navigate(['/']);
        }
      });    
  }

  userLogin(data: login) {
    this.http.get<signup[]>
      (`http://localhost:3000/users?email=${data.email}&password=${data.password}`, { observe: 'response' })
      .subscribe((res) => {
        if (res && res.body?.length) {
          // console.log(res);
          this.invalidUserAuth.emit(false);
          localStorage.setItem('user', JSON.stringify(res.body[0]));
          this.router.navigate(['/']);
        }
        else {
          this.invalidUserAuth.emit(true);
        }
      });
  }

  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }
}
