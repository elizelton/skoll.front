import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Telefone } from '../model/Telefone.model';
import { CrudService } from '../shared/crud-service';

@Injectable({
  providedIn: 'root'
})
export class TelefoneService extends CrudService<Telefone>{

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  urlApi = `${environment.apiURL}/telefone/`
  constructor(public http: HttpClient) {
    super(http,
      `${environment.apiURL}/telefone/`);
  }

  getTelefonesByPessoa(id: number):Observable<Telefone[]>{
    return this.http.get<Telefone[]>(`${this.urlApi}/${id}/pessoa`, this.httpOptions);
  }
}
