import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationAppointmentComponent } from './medication-appointment.component';

describe('MedicationAppointmentComponent', () => {
  let component: MedicationAppointmentComponent;
  let fixture: ComponentFixture<MedicationAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicationAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicationAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
