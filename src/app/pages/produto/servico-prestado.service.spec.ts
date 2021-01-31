import { TestBed } from '@angular/core/testing';

import { ServicoPrestadoService } from './servico-prestado.service';

describe('ServicoPrestadoService', () => {
  let service: ServicoPrestadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicoPrestadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
