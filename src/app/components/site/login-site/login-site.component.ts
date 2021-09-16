import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication.service';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-login-site',
  templateUrl: './login-site.component.html',
  styleUrls: ['./login-site.component.css']
})
export class LoginSiteComponent implements OnInit {

  username = '';
  password = '';
  errorMessage:string="";
  invalidLogin = false;

  @Input() error: string | null;

  constructor(private router: Router,
              private loginservice: AuthenticationService,
              private userService:UserService) { }

  ngOnInit() {
  }


  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
        data => {

          if(data.authorities[0].authority=='ROLE_PATIENT'){ /** connecter avec patient role **/

          this.userService.getUserByUsername(data.username)
            .subscribe(user=>{
              if(user.isActive) /** check if user is active **/
              {
                this.router.navigate(['test-result/0']);
              }else
              {
                this.errorMessage="Authorisation : votre compte est bloqué";
              }
            });
          }else
          {/** connecter  avec personnel role **/

            this.userService.getUserByUsername(data.username)
              .subscribe(user=>{
                if(user.isActive) /** check if user is active **/
                {
                  this.router.navigate(['test-result/1']);
                }else
                {
                  this.errorMessage="Authorisation : votre compte est bloqué";
                }
              });
          }

        }, error => {
         // this.invalidLogin = true;
          this.errorMessage="Erreur : nom d'utilisateur ou mot de passe incorrecte";
          this.error = error.message;
          console.log(error.message);
        }
      )
    );

  }

}
