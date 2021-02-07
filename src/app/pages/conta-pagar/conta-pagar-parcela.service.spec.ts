import { TestBed } from '@angular/core/testing';

import { ContaPagarParcelaService } from './conta-pagar-parcela.service';

describe('ContaPagarParcelaService', () => {
  let service: ContaPagarParcelaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContaPagarParcelaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
