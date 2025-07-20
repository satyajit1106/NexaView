import { TestBed } from '@angular/core/testing';

import { InvtableService } from './invtable.service';

describe('InvtableService', () => {
  let service: InvtableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvtableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
