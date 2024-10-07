import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditingProductComponent } from './editing-product.component';

describe('EditingProductComponent', () => {
  let component: EditingProductComponent;
  let fixture: ComponentFixture<EditingProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditingProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditingProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
