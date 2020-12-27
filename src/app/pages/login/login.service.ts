import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/model/Usuario.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public user: Observable<Usuario>;
  private userSubject: BehaviorSubject<Usuario>;

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

  logout(): void {
    localStorage.removeItem('usuario');
    this.userSubject.next(null);
    this.router.navigateByUrl('/login');
  }
}
