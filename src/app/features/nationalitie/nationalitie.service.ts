import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {nationalitieModel} from "./nationalitie.model";
import {forkJoin, map, Observable, of} from "rxjs";
import {countrieService} from "../countrie/countrie.service";
import {countrieModel} from "../countrie/countrie.model";

@Injectable({
  providedIn: 'root'
})
export class nationalitieService {

  private baseURI = '/api/nationalities'

  constructor(private http: HttpClient, private countrieService: countrieService){
  }

  getAll(countries: string[]): Observable<nationalitieModel[]> {

    // const requests: Observable<countrieModel>[] = countries.map(country => {
    //   console.log(country);
    //   console.log(country);
    //   return this.countrieService.getById(country);
    // });
    //
    //
    // return forkJoin(requests).pipe(
    //   map((countries: countrieModel[]) => {
    //     console.log(countries)
    //     return countries.map((country,index) => {
    //       console.log(country)
    //       return {
    //         id: country.id,
    //         name: country.name,
    //         // id: country.id,
    //         // name: country.name,
    //         creationDate: null,
    //         modificationDate: null,
    //         country: country
    //       };
    //     });
    //   })
    // );

    // Create an array of nationalitieModel objects based on the countries array
    const nationalities: nationalitieModel[] = countries.map(country => {
      return {
        id: country,
        name: country,
        creationDate: null,
        modificationDate: null,
        country: null
      };
    });

    // Return an observable of the nationalities array
    return of(nationalities);

    // return this.http.get<nationalitieModel[]>(this.baseURI);
  }

  getById(id: string): Observable<nationalitieModel> {
    return this.http.get<nationalitieModel>(this.baseURI + '/' + id);
  }

  create(model: nationalitieModel): Observable<nationalitieModel> {
    return this.http.post<nationalitieModel>(this.baseURI, model);
  }

  update(model: nationalitieModel): Observable<nationalitieModel> {
    return this.http.put<nationalitieModel>(this.baseURI, model);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseURI + '/' + id);
  }
}
