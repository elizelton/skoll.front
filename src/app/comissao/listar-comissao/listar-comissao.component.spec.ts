import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarComissaoComponent } from './listar-comissao.component';

describe('ListarComissaoComponent', () => {
  let component: ListarComissaoComponent;
  let fixture: ComponentFixture<ListarComissaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarComissaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarComissaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
