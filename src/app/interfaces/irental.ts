export interface IRental {
  '_id': string;
  'uzytkownik': Array<string>; // id użytkownika
  'zasob': Array<string>;
  'rezerwacja': boolean;
  'data_wypozyczenia': Date;
  'data_zwrotu': Date;
  'uwagi': string;
  }
