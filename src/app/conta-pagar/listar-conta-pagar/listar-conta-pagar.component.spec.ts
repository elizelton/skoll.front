import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarContaPagarComponent } from './listar-conta-pagar.component';

describe('ListarContaPagarComponent', () => {
  let component: ListarContaPagarComponent;
  let fixture: ComponentFixture<ListarContaPagarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarContaPagarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarContaPagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
