import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContaPagar } from 'src/app/model/ContaPagar.model';
import { CrudService } from 'src/app/shared/crud-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContaPagarService extends CrudService<ContaPagar>{

  private url = `${environment.apiURL}/ContaPagar`

  constructor(public http: HttpClient) {
    super(http,
      `${environment.apiURL}/ContaPagar`);
  }

  gerarParcelas(id: number) {
    return this.http.put(`${this.url}/${id}/gerarparcelas`, null);
  }

  gerarParcelaAjuste(id: number, valorDif: number, vencimento: Date) {
    return this.http.put(`${this.url}/${id}/${valorDif}/${vencimento}`, null);
  }
}
