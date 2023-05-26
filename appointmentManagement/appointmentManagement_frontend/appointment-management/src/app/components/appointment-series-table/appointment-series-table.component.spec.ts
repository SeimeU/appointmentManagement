import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentSeriesTableComponent } from './appointment-series-table.component';

describe('AppointmentSeriesTableComponent', () => {
  let component: AppointmentSeriesTableComponent;
  let fixture: ComponentFixture<AppointmentSeriesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentSeriesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentSeriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
