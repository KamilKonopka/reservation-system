import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesPicturesComponent } from './resources-pictures.component';

describe('ResourcesPicturesComponent', () => {
  let component: ResourcesPicturesComponent;
  let fixture: ComponentFixture<ResourcesPicturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcesPicturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
