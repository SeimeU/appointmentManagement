import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BhHomeComponent } from './bh-home.component';

describe('BhHomeComponent', () => {
  let component: BhHomeComponent;
  let fixture: ComponentFixture<BhHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BhHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BhHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
