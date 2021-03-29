import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PoModalAction, PoModalComponent, PoNotificationService } from '@po-ui/ng-components';
import { PoModalPasswordRecoveryType, PoPageLoginLiterals, PoPageLoginRecovery } from '@po-ui/ng-templates';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mostrarMenuEmitter = new EventEmitter<boolean>();
  loading: boolean = false;
  emailRecuperacao = ""

  constructor(
    private router: Router,
    private loginService: LoginService,
    private poNotification: PoNotificationService
  ) { }

  @ViewChild('RecuperarSenhaModal') recuperarSenhaModal: PoModalComponent;
  @ViewChild('EmailForm', { static: true }) formRecupepar: NgForm;


  passwordRecovery() {
    this.recuperarSenhaModal.open()
  }

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
    submitLabel: 'Acessar o sistema',
    loginHint: 'Caso não possua usuário entre em contato com o suporte.',
  };

  ngOnInit(): void {
    document.querySelector('div.po-page-background-footer').setAttribute("hidden", "true")
    // document.querySelector('div.po-page-login-info-icon-container').style.display = 'none'
  }

  close: PoModalAction = {
    action: this.closeModal.bind(this),
    label: 'Cancelar',
    danger: true,
  };

  confirmEnviarSenha: PoModalAction = {
    action: this.enviarSenha.bind(this),
    label: 'Enviar e-mail',
  };

  closeModal() {
    this.recuperarSenhaModal.close()
    this.formRecupepar.reset()
  }

  enviarSenha() {
    debugger
    this.formRecupepar
    this.loginService.recuperarSenha(this.emailRecuperacao)
      .subscribe({
        next: () => {
          this.poNotification.success({message: "E-mail de recuperação enviado com sucesso", duration: 6000 });
          this.closeModal()
        },
        error:() => {
          this.poNotification.error({message: "E-mail de recuperação enviado com sucesso", duration: 6000 })
        }
      }
      )
  }
}
