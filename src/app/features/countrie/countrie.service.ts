import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {countrieModel} from "./countrie.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class countrieService {

  private baseURI = '/api/countries'

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<countrieModel[]> {
    return this.http.get<countrieModel[]>(this.baseURI);
  }

  getById(id: string): Observable<countrieModel> {
    return this.http.get<countrieModel>(this.baseURI + '/' + id);
  }

  // create(model: countrieModel): Observable<countrieModel> {
  //   return this.http.post<countrieModel>(this.baseURI, model);
  // }
  //
  // update(model: countrieModel): Observable<countrieModel> {
  //   return this.http.put<countrieModel>(this.baseURI, model);
  // }
  //
  // delete(id: string): Observable<void> {
  //   return this.http.delete<void>(this.baseURI + '/' + id);
  // }
}
