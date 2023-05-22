import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyEditorFormComponent } from './yearly-editor-form.component';

describe('YearlyEditorFormComponent', () => {
  let component: YearlyEditorFormComponent;
  let fixture: ComponentFixture<YearlyEditorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearlyEditorFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearlyEditorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
