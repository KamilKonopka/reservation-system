export interface IUser {
  _id: string;
  nickname: string;
  imie: string;
  name: string;
  moderator: boolean;
  ulica: string;
  nrdomu: string;
  telefon: string;
  email: string;
  haslo: string;
  wspolnota: boolean;
  datawniosku: Date;
  dataakceptacji: Date;
   akceptacja: boolean;
   uwagi: string;
   archiwum: boolean;
   user_id: number;
}
