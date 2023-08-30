import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationTypeComponent } from './stationtype.component';

describe('StationtypeComponent', () => {
  let component: StationTypeComponent;
  let fixture: ComponentFixture<StationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
