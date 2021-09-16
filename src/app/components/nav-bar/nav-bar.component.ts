import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {ROLES} from '../../../environments/environment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  ROLES: any;
  roleUser: string;

  constructor(private authService:AuthenticationService) { }

  ngOnInit() {
    this.ROLES=ROLES;
    this.roleUser=this.authService.getRole();
  }

  logOut() {
    this.authService.logOutAdmin();
  }

}
