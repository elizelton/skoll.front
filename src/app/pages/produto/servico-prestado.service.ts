import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicoPrestado } from 'src/app/model/ServicoPrestado.model';
import { CrudService } from 'src/app/shared/crud-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicoPrestadoService extends CrudService<ServicoPrestado> {

  private url = `${environment.apiURL}/servicoprestado`
  constructor(public http: HttpClient) {
    super(http,
      `${environment.apiURL}/servicoprestado`);
  }

  getByProduto(recordID: number): Observable<ServicoPrestado> {
    return this.http.get<ServicoPrestado>(`${this.url}/${recordID}/produto`);
}

}
