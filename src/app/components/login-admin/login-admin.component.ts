import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import {ROLES} from '../../../environments/environment';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  username = '';
  password = '';
  errorMessage:string="";
  entite: any;
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
          
          this.userService.getUserByUsername(data.username)
            .subscribe(user=>{
              
              if (user.entite!=null || this.loginservice.getRole()==ROLES.ROLE_SUPER_ADMIN){ /** check if user is authorize **/

              if (this.loginservice.getRole()==ROLES.ROLE_SUPER_ADMIN) this.router.navigate(['utilisateur']);
              else {
                this.entite = user.entite.id;
                sessionStorage.setItem("entite", this.entite);

                if(user.isActive) /** check if user is active **/
                {
                  this.router.navigate(['new-schedule']);
                }else
                {
                  this.errorMessage="Authorisation : votre compte est bloqué";
                }
              }

              } else {
                this.errorMessage="Authorisation : vous n'avez pas de compte sur cet appli";
              }

            });

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
