import { TestBed } from '@angular/core/testing';

import { StockInvService } from './stock-inv.service';

describe('StockInvService', () => {
  let service: StockInvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockInvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
