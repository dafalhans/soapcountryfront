import {countrieModel} from "../countrie/countrie.model";

export class nationalitieModel {
  id?: string | null;
  name?: string | null;
  creationDate?: Date | null;
  modificationDate?: Date | null;
  country?: countrieModel | null;
}
