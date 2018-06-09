export interface Rent {
  _id: string;
  zasob: [
    {
    nazwa: string;
    opis: string;
    data_prod: null;
    uwagi: string;
    archiwum: boolean;
    producent: string[];
    wlasciciel: [
      {
        _id: string;
        imie: string;
        haslo: string;
        wspolnota: boolean
      }
    ],
    zdjecia: string[];
    _created: Date;
    _changed: Date;
    _children: {
      zdjecia: number
    },
    _id: string
  }];
  uzytkownik: [
    {
    _id: string;
    imie: string;
    haslo: string;
    wspolnota: boolean;
    email: string;
    akceptacja: boolean;
    telefon: string;
    uwagi: string;
    archiwum: string;
    ulica: string;
    nrdomu: number;
    _created: Date;
    _changed: Date;
    moderator: boolean;
    datawniosku: Date;
    name: string;
    nickname: string;
    dataakceptacji: Date;
    picture: string;
    user_id: number
    }
  ];
  rezerwacja: boolean;
  data_wypozyczenia: Date;
  data_zwrotu: Date;
  uwagi: string;
}
