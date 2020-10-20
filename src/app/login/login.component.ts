import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  mostrarMenuEmitter = new EventEmitter<boolean>();
  constructor(private router: Router) { }

  logar(){
    localStorage.setItem('logado', 'true');
    this.router.navigate(['/']);
    this.mostrarMenuEmitter.emit(true);
  }

  ngOnInit(): void {
    document.querySelector('div.po-page-background-footer').setAttribute("hidden","true")
    // document.querySelector('div.po-page-login-info-icon-container').style.display = 'none'
  }

}
