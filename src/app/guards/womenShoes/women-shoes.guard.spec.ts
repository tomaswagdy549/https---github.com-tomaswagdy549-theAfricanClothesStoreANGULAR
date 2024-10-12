import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { womenShoesGuard } from './women-shoes.guard';

describe('womenShoesGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => womenShoesGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
