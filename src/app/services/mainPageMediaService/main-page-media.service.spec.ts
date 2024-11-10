import { TestBed } from '@angular/core/testing';

import { MainPageMediaService } from './main-page-media.service';

describe('MainPageMediaService', () => {
  let service: MainPageMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainPageMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
