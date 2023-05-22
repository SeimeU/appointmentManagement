import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyEditorFormComponent } from './daily-editor-form.component';

describe('DailyEditorFormComponent', () => {
  let component: DailyEditorFormComponent;
  let fixture: ComponentFixture<DailyEditorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyEditorFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyEditorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
