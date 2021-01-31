import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFormaPagamentoComponent } from './listar-forma-pagamento.component';

describe('ListarFormaPagamentoComponent', () => {
  let component: ListarFormaPagamentoComponent;
  let fixture: ComponentFixture<ListarFormaPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarFormaPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarFormaPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
