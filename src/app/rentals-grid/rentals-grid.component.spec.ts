import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsGridComponent } from './rentals-grid.component';

describe('RentalsGridComponent', () => {
  let component: RentalsGridComponent;
  let fixture: ComponentFixture<RentalsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
