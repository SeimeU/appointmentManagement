import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyEditorFormComponent } from './weekly-editor-form.component';

describe('WeeklyEditorFormComponent', () => {
  let component: WeeklyEditorFormComponent;
  let fixture: ComponentFixture<WeeklyEditorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyEditorFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyEditorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
