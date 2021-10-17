import { TestBed } from '@angular/core/testing';

import { UserURLService } from './user-url.service';

describe('UserURLService', () => {
  let service: UserURLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserURLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
