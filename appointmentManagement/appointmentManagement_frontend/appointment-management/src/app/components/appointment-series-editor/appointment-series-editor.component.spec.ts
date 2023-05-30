import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentSeriesEditorComponent } from './appointment-series-editor.component';

describe('AppointmentSeriesEditorComponent', () => {
  let component: AppointmentSeriesEditorComponent;
  let fixture: ComponentFixture<AppointmentSeriesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentSeriesEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentSeriesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
