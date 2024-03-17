import {Injectable} from '@angular/core';
import {countrieService} from "./countrie.service";
import {BehaviorSubject, Observable} from "rxjs";
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
    // this.countrieService.getById(id).subscribe((data) => this.current$.next(data));
    // // console.log(this.current$.value);
    this.countrieService.getById(id).subscribe(
      (data) => {
        this.current$.next(data);
        console.log('Country details updated:', data); // Logging the updated data for debugging
      },
      (error) => {
        console.error('Error fetching country details:', error); // Log any errors that occur during data retrieval
        // Optionally, handle the error or notify the user accordingly
      }
    );
  }

  getById2(id: string): Observable<countrieModel> {
    // this.countrieService.getById(id).subscribe((data) => this.current$.next(data));
    // // console.log(this.current$.value);
    console.log(this.countrieService.getById(id).subscribe((data) => console.log("from getbyid2 " + data.capital)));
    return this.countrieService.getById(id);
    // this.countrieService.getById(id).subscribe(
    //   (data) => {
    //     this.current$.next(data);
    //     console.log('Country details updated:', data); // Logging the updated data for debugging
    //   },
    //   (error) => {
    //     console.error('Error fetching country details:', error); // Log any errors that occur during data retrieval
    //     // Optionally, handle the error or notify the user accordingly
    //   }
    // );
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
