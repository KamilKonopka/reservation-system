import {ITools} from '../interfaces/itools';

export class Tools implements ITools {
  constructor(
              public  _id: string = null,
              public nazwa: string = '',
              public opis: string = '',
              public data_prod: Date = null,
              public producent: string = '',
              public wlasciciel: string = '',
              public uwagi: string = '',
) {
  }
}
