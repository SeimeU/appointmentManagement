import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayorChartComponent } from './mayor-chart.component';

describe('MayorChartComponent', () => {
  let component: MayorChartComponent;
  let fixture: ComponentFixture<MayorChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MayorChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MayorChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
