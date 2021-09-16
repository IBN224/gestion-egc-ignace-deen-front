import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';


@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient,
              private route:Router) {}
// Provide username and password for authentication, and once authentication is successful, 
//store JWT token in session
  authenticate(username, password) {
    return this.httpClient
      .post<any>(environment.API_URL+'/api/auth/signin', { username, password })
      .pipe(
        map(userData => {
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("authority", userData.authorities[0].authority);
          let tokenStr = "Bearer " + userData.accessToken;
          sessionStorage.setItem("token", tokenStr);
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    //console.log(!(user === null));
    return !(user === null);
  }

  checkUserRole():boolean{
    let role = sessionStorage.getItem("authority");
          if (role=='ROLE_PATIENT') return true;
          else return false;
  }

  logOut() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("authority");
    this.route.navigate(['login']);
  }

  logOutAdmin() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("authority");
    sessionStorage.removeItem("entite");
    this.route.navigate(['login-admin']);
  }

  getEntite():number{
    return parseInt(sessionStorage.getItem("entite"));
  }

  getRole():string{
    return sessionStorage.getItem("authority");
  }

}
