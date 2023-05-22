import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyEditorFormComponent } from './monthly-editor-form.component';

describe('MonthlyEditorFormComponent', () => {
  let component: MonthlyEditorFormComponent;
  let fixture: ComponentFixture<MonthlyEditorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyEditorFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyEditorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
