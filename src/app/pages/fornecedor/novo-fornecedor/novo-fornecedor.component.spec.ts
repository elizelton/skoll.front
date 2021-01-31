import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoFornecedorComponent } from './novo-fornecedor.component';

describe('NovoFornecedorComponent', () => {
  let component: NovoFornecedorComponent;
  let fixture: ComponentFixture<NovoFornecedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoFornecedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
