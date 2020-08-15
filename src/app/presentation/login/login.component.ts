import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PoPageLogin } from '@po-ui/ng-templates';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginErrors = [];
  passwordErrors = [];

  constructor(private router: Router) { }

  ngOnInit() {
  }


  autenticarUsuario(form: PoPageLogin) {

 
  }

  passwordChange() {
    if (this.passwordErrors.length) {
      this.passwordErrors = [];
    }
  }

  loginChange() {
    if (this.loginErrors.length) {
      this.loginErrors = [];
    }
  }

}
