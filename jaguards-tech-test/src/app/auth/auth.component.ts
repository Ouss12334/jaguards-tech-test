import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import { AuthService } from '../_services/auth.service';
import { Auth, User } from '../_models/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  users: Auth[];
  // bool upon failed login/register, is set to true with a  displayed message
  isAbleSignIn__SignUp = false;
  errorMsg;
  loginValidator; pswValidator;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.users = [
        { login: "a@g.c", psw: 'a'}
      ];
      this.loginValidator = "";
      this.pswValidator = "";
  }

  signup(login: string, psw: string): void {
    if (!this.users.find(u => u.login == login)) {
      this.users.push({login: login, psw: psw})
      
      this.authService.addUserOfLogin({ special_name: login} as User)
        .subscribe(() => this.router.navigate(['/tos']))
    }
    else {
      this.errorMsg = "Email deja pris"
      this.isAbleSignIn__SignUp = true;
    }
  }

  signin(login: string, psw: string): void {
    if (this.users.find(u => u.login == login && u.psw == psw)) {
      this.isAbleSignIn__SignUp = false;
      this.authService.addUserOfLogin({ special_name: login} as User)
        .subscribe(() => this.router.navigate(['/tos']))
    }
    else {
      this.errorMsg = "Identifiants Incorrects"
      this.isAbleSignIn__SignUp = true;
    }
  }
}
