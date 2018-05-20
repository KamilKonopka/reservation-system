export interface IRental {
  '_id': string;
  'cuzytkownicy': Array<string>; // id użytkownika
  'czasoby': Array<string>;
  'rezerwacja': boolean;
  'data_wypozyczenia': Date;
  'data_zwrotu': Date;
  'uwagi': string;
  }
