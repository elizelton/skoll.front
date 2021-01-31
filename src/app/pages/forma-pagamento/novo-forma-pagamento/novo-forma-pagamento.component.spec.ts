import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoFormaPagamentoComponent } from './novo-forma-pagamento.component';

describe('NovoFormaPagamentoComponent', () => {
  let component: NovoFormaPagamentoComponent;
  let fixture: ComponentFixture<NovoFormaPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoFormaPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoFormaPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
