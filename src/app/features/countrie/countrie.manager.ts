import {Injectable} from '@angular/core';
import {countrieService} from "./countrie.service";
import {BehaviorSubject} from "rxjs";
import {countrieModel} from "./countrie.model";

@Injectable({
  providedIn: 'root'
})
export class countrieManager {

  all$ = new BehaviorSubject<countrieModel[]>([]);
  current$ = new BehaviorSubject<countrieModel | null>(null);

  constructor(private countrieService: countrieService) {
  }

  getAll() {
    this.countrieService.getAll()
      .subscribe((data: countrieModel[]) => this.all$.next(data));
  }

  // getById(id: string) {
  //   this.countrieService.getById(id).subscribe((data) => this.current$.next(data));
  // }
  getById(id: string) {
    this.countrieService.getById(id).subscribe((data) => this.current$.next(data));
    console.log(this.current$.value);
  }

  // create(model: countrieModel) {
  //   this.countrieService.create(model).subscribe(() => this.getAll());
  // }
  //
  // update(model: countrieModel) {
  //   this.countrieService.update(model).subscribe(() => this.getAll());
  // }
  //
  // delete(id: string) {
  //   this.countrieService.delete(id).subscribe(() => this.getAll());
  // }

}
