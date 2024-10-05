import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { femaleResolverGuard } from './female-resolver.guard';

describe('femaleResolverGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => femaleResolverGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
