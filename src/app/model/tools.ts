import {ITools} from '../interfaces/itools';
import {User} from './user';

export class Tools implements ITools {
    constructor(
        public  _id: string = null,
        public nazwa: string = '',
        public opis: string = '',
        public data_prod: Date = null,
        public producent: string = '',
        public wlasciciel: User = null,
        public uwagi: string = '',
        public archiwum: boolean = false
    ) {
    }
}
