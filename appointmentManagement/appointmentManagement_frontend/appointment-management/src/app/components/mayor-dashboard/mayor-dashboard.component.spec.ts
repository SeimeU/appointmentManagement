import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayorDashboardComponent } from './mayor-dashboard.component';

describe('MayorDashboardComponent', () => {
  let component: MayorDashboardComponent;
  let fixture: ComponentFixture<MayorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MayorDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MayorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
