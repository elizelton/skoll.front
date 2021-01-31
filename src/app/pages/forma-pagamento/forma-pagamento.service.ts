import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormaPagamento } from 'src/app/model/FormaPagamento.model';
import { CrudService } from 'src/app/shared/crud-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService extends CrudService<FormaPagamento>{
  constructor(public http: HttpClient) {
    super(http,
      `${environment.apiURL}/formapagamento`);
  }


  downloadCsv(endpoint) {
    this.http.get(endpoint).subscribe((data) => {
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
  
}
