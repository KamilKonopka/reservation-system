import { TestBed, inject, async } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { RegistrationService } from './registration.service';
import {IUser} from '../interfaces/iuser';
import {User} from '../model/user';


describe('RegistrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [RegistrationService]
    });
  });

  it('should be created', inject([RegistrationService], (service: RegistrationService) => {
    expect(service).toBeTruthy();
  }));
  fit('trying to add hkloss returns: Nazwa użytkownika jest już w użyciu ', async(inject(
    [RegistrationService], (service: RegistrationService) => {
      const users: User[] = [
        {'_id' : '123455555', imie: 'Jacek', nickname: 'slewiski', email : 'sl@wp.pl', telefon : '48123456780', name : 'Kowalslki', haslo : '123', login : 'aaaa', ulica : 'Pomorska', nrdomu : '33', akceptacja : true, archiwum : false, dataakceptacji : new Date(), datawniosku : new Date(), wspolnota : true, uwagi : '', user_id : 123, moderator : false },
        {'_id' : '123455555', imie: 'Jacek', nickname: 'hkloss', email : 'mn@wp.pl', telefon : '48123456789', name : 'Kowalski', haslo : '123', login : 'bbbb', ulica : 'Pomorska', nrdomu : '44', akceptacja : true, archiwum : false, dataakceptacji : new Date(), datawniosku : new Date(), wspolnota : true, uwagi : '', user_id : 432, moderator : false}
      ];
      const user = {'_id' : '123455555', imie: 'Jacek', nickname: 'hkloss', email : 'mn@wp.pl', telefon : '48123456789', name : 'Kowalski', haslo : '123', login : 'bbbb', ulica : 'Pomorska', nrdomu : '44', akceptacja : true, archiwum : false, dataakceptacji : new Date(), datawniosku : new Date(), wspolnota : true, uwagi : '', user_id : 432, moderator : false};

      let result: string = service.userNameTelLoginExists(users, user) ;
      expect(result).toEqual('Nazwa użytkownika jest już w użyciu');

    })));
});
