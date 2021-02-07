import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContaPagarParcela } from 'src/app/model/ContaPagarParcela.model';
import { CrudService } from 'src/app/shared/crud-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContaPagarParcelaService extends CrudService<ContaPagarParcela>{

  private url = `${environment.apiURL}/ContaPagarParcela`

  constructor(public http: HttpClient) {
    super(http,
      `${environment.apiURL}/ContaPagarParcela`);
  }

  getContaPagar(id: number) {
    return this.http.get(`${this.url}/${id}/contapagar`);
  }

  getVencimento(data: Date) {
    return this.http.get(`${this.url}/${data}/vencimento`);
  }


  getNaoPagasTotalmente() {
    return this.http.get(`${this.url}/naopagastotalmente`);
  }

  getParcPendentes() {
    return this.http.get(`${this.url}/pendentes`);
  }
}
