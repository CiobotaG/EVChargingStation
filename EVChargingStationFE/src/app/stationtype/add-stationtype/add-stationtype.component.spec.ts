import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStationTypeComponent } from './add-stationtype.component';

describe('AddStationTypeComponent', () => {
  let component: AddStationTypeComponent;
  let fixture: ComponentFixture<AddStationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStationTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
