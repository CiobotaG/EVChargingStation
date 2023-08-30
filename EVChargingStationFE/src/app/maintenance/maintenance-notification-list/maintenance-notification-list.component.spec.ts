import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceNotificationListComponent } from './maintenance-notification-list.component';

describe('MaintenanceNotificationListComponent', () => {
  let component: MaintenanceNotificationListComponent;
  let fixture: ComponentFixture<MaintenanceNotificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintenanceNotificationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintenanceNotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
