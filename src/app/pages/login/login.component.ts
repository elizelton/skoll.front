import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoPageLoginLiterals } from '@po-ui/ng-templates';
import { first } from 'rxjs/operators';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mostrarMenuEmitter = new EventEmitter<boolean>();
  loading: boolean = false;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  logar(form) {
    this.loading = true;
    this.loginService.login(form.login, form.password)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/')
        },
        error: () => {
          this.loading = false
        }
      });
  }

  customLiterals: PoPageLoginLiterals = {
    loginPlaceholder: 'Insira seu usuário de acesso',
    passwordPlaceholder: 'Insira sua senha de acesso',
    submitLabel: 'Acessar o sistema'
  };

  ngOnInit(): void {
    document.querySelector('div.po-page-background-footer').setAttribute("hidden", "true")
    // document.querySelector('div.po-page-login-info-icon-container').style.display = 'none'
  }

}
