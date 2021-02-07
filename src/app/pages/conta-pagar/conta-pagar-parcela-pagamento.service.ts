import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContaPagarParcelaPagamento } from 'src/app/model/ContaPagarParcelaPagamento.model';
import { CrudService } from 'src/app/shared/crud-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContaPagarParcelaPagamentoService extends CrudService<ContaPagarParcelaPagamento>{ 

  private url = `${environment.apiURL}/contaPagarparcelapagamento`

  constructor(public http: HttpClient) {
    super(http,
      `${environment.apiURL}/contaPagarparcelapagamento`);
  }

  getContaPagarParc(id: number){
    return this.http.get(`${this.url}/${id}/contapagarparc`);
  }
}
