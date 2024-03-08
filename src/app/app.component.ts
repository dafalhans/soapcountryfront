import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {countrieComponent} from "./features/countrie/countrie.component";
import {nationalitieComponent} from "./features/nationalitie/nationalitie.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, countrieComponent, nationalitieComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'soapcountryfront';
}
