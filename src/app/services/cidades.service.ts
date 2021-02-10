import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cidade } from '../model/Cidade.model';

@Injectable({
  providedIn: 'root'
})
export class CidadesService {

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  urlApi = `${environment.apiURL}/Cidade`
  constructor(private http: HttpClient) { }

  getCidades(estado: string) {
    return this.http.get<Cidade>(`${this.urlApi}/${estado}/estado`, this.httpOptions);
  }

getCidadeById(cidade: Number){
  return this.http.get<Cidade>(`${this.urlApi}/${cidade}`, this.httpOptions);
}

  getEstados() {
    return [
      { label: 'Acre', value: 'AC' },
      { label: 'Alagoas', value: 'AL' },
      { label: 'Amapá', value: 'AP' },
      { label: 'Amazonas', value: 'AM' },
      { label: 'Bahia', value: 'BA' },
      { label: 'Ceará', value: 'CE' },
      { label: 'Distrito Federal', value: 'DF' },
      { label: 'Espírito Santo', value: 'ES' },
      { label: 'Goiás', value: 'GO' },
      { label: 'Maranhão', value: 'MA' },
      { label: 'Mato Grosso', value: 'MT' },
      { label: 'Mato Grosso do Sul', value: 'MS' },
      { label: 'Minas Gerais', value: 'MG' },
      { label: 'Pará', value: 'PA' },
      { label: 'Paraíba', value: 'PB' },
      { label: 'Paraná', value: 'PR' },
      { label: 'Pernambuco', value: 'PE' },
      { label: 'Piauí', value: 'PI' },
      { label: 'Rio de Janeiro', value: 'RJ' },
      { label: 'Rio Grande do Norte', value: 'RN' },
      { label: 'Rio Grande do Sul', value: 'RS' },
      { label: 'Rondônia', value: 'RO' },
      { label: 'Roraima', value: 'RR' },
      { label: 'Santa Catarina', value: 'SC' },
      { label: 'São Paulo', value: 'SP' },
      { label: 'Sergipe', value: 'SE' },
      { label: 'Tocantins', value: 'TO' },
    ]
  }
}
