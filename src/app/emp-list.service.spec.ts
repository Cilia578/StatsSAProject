import { TestBed } from '@angular/core/testing';

import { EmpListService } from './emp-list.service';

describe('EmpListService', () => {
  let service: EmpListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
