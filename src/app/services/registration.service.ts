import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/iuser';
import { User } from '../model/user';
import { Observable } from 'rxjs/Observable';

const url = 'https://ecommunity-80ee.restdb.io/rest/cuzytkownicy';
const getoptions = {
  headers: {
    'cache-control': 'no-cache',
    'x-apikey': '5ad4ec0a25a622ae4d52836f'
  }
};

const options = {
  headers:
    {   'cache-control': 'no-cache',
      'x-apikey': '5ad4ec0a25a622ae4d52836f',
      'content-type': 'application/json'
    }
};






@Injectable()
export class RegistrationService {
message: string;

  constructor(private http: HttpClient) {
  }

  private userNameTelLoginExists( userArr, usrToAdd: IUser): string {
    if (userArr == null) {
      return '';
    }
    for (let i = 0; i < userArr.length; i++) {
      if (userArr[i].nazwa.toLocaleLowerCase() === usrToAdd.nazwa.toLocaleLowerCase()) {
        console.log(userArr[i].nazwa);
        return 'Nazwa użytkownika jest już w użyciu';
      }
      if (userArr[i].email.toLocaleLowerCase() === usrToAdd.email.toLocaleLowerCase()) {
        return 'Adres email jest już użyty';
      }
      if (userArr[i].telefon.toLocaleLowerCase() === usrToAdd.telefon.toLocaleLowerCase()) {
        return 'Podany telefon został już użyty';
      }
    }
    return '';
  }

 public getUsers(): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>(url + '?q={}&h={"$orderby": {"datawniosku": -1}} ', getoptions);
  }

  public getActiveUsers(): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>(url + '?q={"archiwum":false}', getoptions);
  }

  public getUserById( id: string): Observable<User> {
    return this.http.get<User>(url + '/' + id, getoptions);
  }
  public updateUser(  user: User): Observable<object> {
    return this.http.put(url + '/' + user._id, user, options);
  }

  public addUser(user: User): Observable<object>  {
//    console.log(user);
    return this.http.post(url, user, options);
  }
  /*
  public insertUser(user: User): Observable<object>  {
//    console.log(user);
    this.getActiveUsers(user).subscribe(users=>{

    })
    return this.http.post(url, user, options);
  }
  */
}









