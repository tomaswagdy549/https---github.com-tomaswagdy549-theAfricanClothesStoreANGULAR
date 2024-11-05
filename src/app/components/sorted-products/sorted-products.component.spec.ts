import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortedProductsComponent } from './sorted-products.component';

describe('SortedProductsComponent', () => {
  let component: SortedProductsComponent;
  let fixture: ComponentFixture<SortedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortedProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
