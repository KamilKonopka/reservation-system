import { TestBed, inject } from '@angular/core/testing';

import { UserDashboardDataService } from './user-dashboard-data.service';

describe('UserDashboardDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDashboardDataService]
    });
  });

  it('should be created', inject([UserDashboardDataService], (service: UserDashboardDataService) => {
    expect(service).toBeTruthy();
  }));
});
