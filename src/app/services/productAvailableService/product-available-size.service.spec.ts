import { TestBed } from '@angular/core/testing';

import { ProductAvailableSizeService } from './product-available-size.service';

describe('ProductAvailableSizeService', () => {
  let service: ProductAvailableSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductAvailableSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
