import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComissaoService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  urlApi = `${environment.apiURL}/pagamentoComissao`
  constructor(public http: HttpClient) {
  }

  getComissao(idVendedor: number, inicio: string, fim: string, filtro: number) {
    return this.http.get(`${this.urlApi}/${idVendedor}/${inicio}/${fim}/${filtro}`, this.httpOptions);
  }

  pagamentoComissao(idVendedor: number,filtro: number, contratoList, inicio: string, fim: string,) {
    return this.http.put(`${this.urlApi}/${idVendedor}/${filtro}/${inicio}/${fim}`,contratoList);
  }
}