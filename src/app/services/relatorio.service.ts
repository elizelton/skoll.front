import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  headers = new HttpHeaders();  urlApi = `${environment.apiURL}/Relatorio`
  constructor(private http: HttpClient) { }

  GerarParcelasPagar(dataAte: string) {
    return this.http.get(`${this.urlApi}/${dataAte}/parcelapagar`,{ headers: this.headers, responseType: 'blob' });
  }

  GerarParcelasVencer(dataAte: string) {
    return this.http.get(`${this.urlApi}/${dataAte}/parcelavencer`, { headers: this.headers, responseType: 'blob' });
  }

  GerarContratoCliente(idCliente: number, inicio: string, fim: string) {
    return this.http.get(`${this.urlApi}/${idCliente}/${inicio}/${fim}/contratocliente`, { headers: this.headers, responseType: 'blob' });
  }

  GerarContratoVendedor(idVendedor: number, inicio: string, fim: string) {
    return this.http.get(`${this.urlApi}/${idVendedor}/${inicio}/${fim}/contratovendedor`, { headers: this.headers, responseType: 'blob' });
  }
  
  GerarContratoMes(mes: number, ano: number) {
    return this.http.get(`${this.urlApi}/${mes}/${ano}/contratomes`, { headers: this.headers, responseType: 'blob' });
  }

  GerarRelParcelas(inicio: string, fim: string) {
    return this.http.get(`${this.urlApi}/${inicio}/${fim}/relparcelas`, { headers: this.headers, responseType: 'blob' });
  }

  ImprimirRecibo(idParcela: number, valor: number, valorExtenso: string, imprimirObs: boolean) {
    return this.http.get(`${this.urlApi}/${idParcela}/${valor}/${valorExtenso}/${imprimirObs}/ImprimeRecibo`, { headers: this.headers, responseType: 'blob' });
  }

  
  GerarComissaoVendedor(idVendedor: number, inicio: string, fim: string) {
    return this.http.get(`${this.urlApi}/${idVendedor}/${inicio}/${fim}/relcomissao`, { headers: this.headers, responseType: 'blob' });
  }
}
