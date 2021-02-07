import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PoTableColumn } from '@po-ui/ng-components';
import { CrudService } from 'src/app/shared/crud-service';
import { environment } from 'src/environments/environment';
import { Contrato } from 'src/app/model/Contrato.model';

@Injectable({
  providedIn: 'root'
})
export class ContratoService extends CrudService<Contrato>{ 

  private url = `${environment.apiURL}/Contrato`

  constructor(public http: HttpClient) {
    super(http,
      `${environment.apiURL}/Contrato`);
  }


  gerarParcelas(id: number, diaVencimento: number, isPrimeira: boolean){
    return this.http.put(`${this.url}/${id}/${diaVencimento}/${isPrimeira}/gerarparcelas`, null);
  }

  cancelarContrato(id: number, novoCliente?: number){
    return this.http.put(`${this.url}/${id}/${novoCliente}/cancelar`, null);
  }


  downloadCsv(endpoint) {
    this.http.get(endpoint).subscribe(data => {
      const csvStr = this.parseJsonToCsv(data['items']);
      const dataUri = 'data:text/csv;charset=utf-8,' + csvStr;

      const exportFileDefaultName = 'data.csv';

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    });
  }

  parseJsonToCsv(jsonData = []) {
    if (!jsonData.length) {
      return '';
    }

    const keys = Object.keys(jsonData[0]);
    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const csvColumnHeader = keys.join(columnDelimiter);

    const csvStr = jsonData.reduce((accCsvStr, currentItem) => {
      keys.forEach((key, index) => {
        if (index && index < keys.length - 1) {
          accCsvStr += columnDelimiter;
        }

        accCsvStr += currentItem[key];
      });

      return accCsvStr + lineDelimiter;
    }, csvColumnHeader + lineDelimiter);

    return encodeURIComponent(csvStr);
  }

  filter(filters) {
    let filteredItems = [...this.getItems()];

    Object.keys(filters).forEach(filter => {
      filteredItems = filteredItems.filter(register => {
        return register[filter].toLocaleLowerCase().includes(filters[filter].toLocaleLowerCase());
      });
    });

    return filteredItems;
  }

  getColumns(): Array<PoTableColumn> {
    return [
      {
        property: 'hireStatus',
        label: 'Status',
        type: 'subtitle',
        subtitles: [
          { value: '1', color: 'success', label: 'Hired', content: '1' },
          { value: '2', color: 'warning', label: 'Progress', content: '2' },
          { value: '3', color: 'danger', label: 'Canceled', content: '3' }
        ]
      },
      { property: 'idCard', label: 'Identity card', type: 'string' },
      { property: 'name', label: 'Name' },
      { property: 'age', label: 'Age' },
      { property: 'city', label: 'City' },
      { property: 'jobDescription', label: 'Job description', type: 'string' }
    ];
  }

  getHireStatus() {
    return [
      { value: '1', label: 'Hired' },
      { value: '2', label: 'Progress' },
      { value: '3', label: 'Canceled' }
    ];
  }

  getItems() {
    return [
      {
        hireStatus: '1',
        name: 'James Johnson',
        city: 'Ontario',
        age: 24,
        idCard: 'AB34lxi90',
        job: 'abc',
        jobDescription: 'Systems Analyst'
      },
      {
        hireStatus: '2',
        name: 'Brian Brown',
        city: 'Buffalo',
        age: 23,
        idCard: 'HG56lds54',
        job: 'def',
        jobDescription: 'Trainee'
      },
      {
        hireStatus: '3',
        name: 'Mary Davis',
        city: 'Albany',
        age: 31,
        idCard: 'DF23cfr65',
        job: 'ghi',
        jobDescription: 'Programmer'
      },
      {
        hireStatus: '1',
        name: 'Margaret Garcia',
        city: 'New York',
        age: 29,
        idCard: 'GF45fgh34',
        job: 'jkl',
        jobDescription: 'Web developer'
      },
      {
        hireStatus: '1',
        name: 'Emma Hall',
        city: 'Ontario',
        age: 34,
        idCard: 'RF76jut21',
        job: 'mno',
        jobDescription: 'Recruiter'
      },
      {
        hireStatus: '2',
        name: 'Lucas Clark',
        city: 'Utica',
        age: 32,
        idCard: 'HY21kgu65',
        job: 'pqr',
        jobDescription: 'Consultant'
      },
      {
        hireStatus: '1',
        name: 'Ella Scott',
        city: 'Ontario',
        age: 24,
        idCard: 'UL78flg68',
        job: 'stu',
        jobDescription: 'DBA'
      },
      {
        hireStatus: '2',
        name: 'Chloe Walker',
        city: 'Albany',
        age: 29,
        idCard: 'JH12oli98',
        job: 'ghi',
        jobDescription: 'Programmer'
      }
    ];
  }

  getJobs() {
    return [
      { value: 'abc', label: 'Systems Analyst' },
      { value: 'def', label: 'Trainee' },
      { value: 'ghi', label: 'Programmer' },
      { value: 'jkl', label: 'Web developer' },
      { value: 'mno', label: 'Recruiter' },
      { value: 'pqr', label: 'Consultant' },
      { value: 'stu', label: 'DBA' }
    ];
  }

  resetFilterHiringProcess() {
    return [...this.getItems()];
  }

  getPageOptions() {
    return {
      actions: [{ label: 'Find on Google' }],
      filters: [
        { property: 'idCard', gridColumns: 6 },
        { property: 'city', initValue: 'Ontario' }
      ],
      keepFilters: true
    };
  }
  getCity(state: number) {
    switch (state) {
      case 1: {
        return [
          { label: 'Palhoça', value: 5 },
          { label: 'Lages', value: 6 },
          { label: 'Balneário Camboriú', value: 7 },
          { label: 'Brusque', value: 8 }
        ];
      }
      case 2: {
        return [
          { label: 'São Paulo', value: 9 },
          { label: 'Guarulhos', value: 10 },
          { label: 'Campinas', value: 11 },
          { label: 'São Bernardo do Campo', value: 12 }
        ];
      }
      case 3: {
        return [
          { label: 'Rio de Janeiro', value: 13 },
          { label: 'São Gonçalo', value: 14 },
          { label: 'Duque de Caxias', value: 15 },
          { label: 'Nova Iguaçu', value: 16 }
        ];
      }
      case 4: {
        return [
          { label: 'Belo Horizonte', value: 17 },
          { label: 'Uberlândia', value: 18 },
          { label: 'Contagem', value: 19 },
          { label: 'Juiz de Fora', value: 20 }
        ];
      }
    }
    return [];
  }

  getUserDocument(value) {
    // const cpfField = { property: 'cpf', visible: true };
    // const cnpjField = { property: 'cnpj', visible: true };
    // const document = value.isJuridicPerson ? cnpjField : cpfField;

    return {
      fields: [document]
    };
  }
}
