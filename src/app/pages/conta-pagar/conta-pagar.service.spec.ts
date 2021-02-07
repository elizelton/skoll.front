import { TestBed } from '@angular/core/testing';

import { ContaPagarService } from './conta-pagar.service';

describe('ContaPagarService', () => {
  let service: ContaPagarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContaPagarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
