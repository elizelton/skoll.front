import { TestBed } from '@angular/core/testing';

import { ContaPagarParcelaPagamentoService } from './conta-pagar-parcela-pagamento.service';

describe('ContaPagarParcelaPagamentoService', () => {
  let service: ContaPagarParcelaPagamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContaPagarParcelaPagamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
