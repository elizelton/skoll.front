import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export class CrudService<T> {


    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    constructor(protected http: HttpClient,
        protected apiUrl: string) { }

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(this.apiUrl);
    }

    get(recordID: String): Observable<T> {
        return this.http.get<T>(this.apiUrl + '/' + recordID);
    }

    insert(record: T): Observable<T> {
        return this.http.post<T>(this.apiUrl, record, this.httpOptions);
    }

    update(recordID: string, record: T): Observable<T> {
        const apiurl = `${this.apiUrl}/${recordID}`;
        return this.http.put<T>(apiurl, record, this.httpOptions);
    }

    delete(recordID: Number): Observable<Number> {
        const apiurl = `${this.apiUrl}/${recordID}`;
        return this.http.delete<number>(apiurl, this.httpOptions);
    }

}
