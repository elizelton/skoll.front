import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/model/Usuario.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public user: Observable<Usuario>;
  private userSubject: BehaviorSubject<Usuario>;
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json '}) };


  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('usuario')));
    this.user = this.userSubject.asObservable();

   }

  login(username, senha): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.apiURLAuth}`, { username, senha })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('usuario', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  isUsuarioAutenticado(): boolean{
    return (!!this.userSubject.getValue())
  }

  getUsuarioLogado(): Usuario{
    return (this.userSubject.getValue())
  }

  refreshToken(): Observable<Usuario> {
    let refreshToken = this.getUsuarioLogado().refreshToken
    if (refreshToken && new Date(refreshToken.expirationDate) < new Date()) {
      let obj = { refreshToken: refreshToken.token }

      return this.http.post<Usuario>(`${environment.apiURLAuth}/Autenticacao/Autenticar`, obj, this.httpOptions)
        .pipe(map(user => {

          localStorage.setItem('usuario', JSON.stringify(user))
          this.userSubject.next(user)

          return user
        }))
    }
    else {
      return throwError('RefreshToken invalido ou expirado.')
    }
  }

  logout(): void {
    localStorage.removeItem('usuario');
    this.userSubject.next(null);
    this.router.navigateByUrl('/login');
  }

  recuperarSenha(email: string){
    return this.http.put(`${environment.apiURLEsqueciSenha}`, { email })
  }
}
