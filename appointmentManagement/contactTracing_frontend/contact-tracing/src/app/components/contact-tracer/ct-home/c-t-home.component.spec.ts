import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CTHomeComponent } from './c-t-home.component';

describe('HomeComponent', () => {
  let component: CTHomeComponent;
  let fixture: ComponentFixture<CTHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CTHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CTHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
