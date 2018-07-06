import {TestBed, inject, async} from '@angular/core/testing';

import { RentalService } from '../services/rental.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RentalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
      ],
      providers: [RentalService]
    });
  });


  fit('should be created', inject([RentalService], (service: RentalService) => {
    expect(service).toBeTruthy();
  }));


  fit('rounded time to quarter for 2018-05-01 10:37 sholuld be 1045 ', async(inject(
    [RentalService], (service: RentalService) => {

      let result: string = service.stringTime(new Date('2018-05-01 10:37')) ;


      expect(result).toEqual('1045');

    })));

  fit('rounded time to quarter for 2018-03-02 12:33 sholuld be 1245 ', async(inject(
    [RentalService], (service: RentalService) => {

      let result: string = service.stringTime(new Date('2018-03-02 12:45')) ;


      expect(result).toEqual('1245');

    })));

  fit('rounded time to quarter for 2018-03-02 12:346 sholuld be 1300 ', async(inject(
    [RentalService], (service: RentalService) => {

      let result: string = service.stringTime(new Date('2018-03-02 12:46')) ;


      expect(result).toEqual('1300');

    })));
});
