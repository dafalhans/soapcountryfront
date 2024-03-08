import {Injectable} from '@angular/core';
import {nationalitieService} from "./nationalitie.service";
import {BehaviorSubject} from "rxjs";
import {nationalitieModel} from "./nationalitie.model";
import {countrieService} from "../countrie/countrie.service";

@Injectable({
  providedIn: 'root'
})
export class nationalitieManager {

  all$ = new BehaviorSubject<nationalitieModel[]>([]);
  current$ = new BehaviorSubject<nationalitieModel | null>(null);
  countries$ = new BehaviorSubject<nationalitieModel[]>([]);


 // countries = ['BEL', 'FRA', 'EGY','DEU'];

  constructor(private nationalitieService: nationalitieService, private countrieService: countrieService) {
  }

  // getAll() {
  //   this.nationalitieService.getAll()
  //     .subscribe((data: nationalitieModel[]) => this.all$.next(data));
  // }

  getAllCountries(countries: string[]) {
    for(let c in countries){
      console.log(c)
    }

    this.nationalitieService.getAll(countries)
      .subscribe((data: nationalitieModel[]) => this.countries$.next(data));
  }

  getById(id: string) {
    this.nationalitieService.getById(id).subscribe((data) => this.current$.next(data));
  }

  // create(model: nationalitieModel) {
  //   this.nationalitieService.create(model).subscribe(() => this.getAll());
  // }
  //
  // update(model: nationalitieModel) {
  //   this.nationalitieService.update(model).subscribe(() => this.getAll());
  // }
  //
  // delete(id: string) {
  //   this.nationalitieService.delete(id).subscribe(() => this.getAll());
  // }

}
