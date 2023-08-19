import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportItemsWithPriceComponent } from './report-items-with-price.component';

describe('ReportItemsWithPriceComponent', () => {
  let component: ReportItemsWithPriceComponent;
  let fixture: ComponentFixture<ReportItemsWithPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportItemsWithPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportItemsWithPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
