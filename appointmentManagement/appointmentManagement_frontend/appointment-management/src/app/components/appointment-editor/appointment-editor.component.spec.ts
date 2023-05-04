import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentEditorComponent } from './appointment-editor.component';

describe('AppointmentEditorComponent', () => {
  let component: AppointmentEditorComponent;
  let fixture: ComponentFixture<AppointmentEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
