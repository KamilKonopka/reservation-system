import { IRental } from '../interfaces/irental';

export class Rental implements IRental {

    public  _id: string = null;
    public cuzytkownicy: Array<string>;
    public czasoby: Array<string>;
    public rezerwacja = true;
    public data_wypozyczenia: Date;
    public data_zwrotu: Date;
    public  uwagi: string ;
}

