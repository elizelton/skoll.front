import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListarContaPagarComponent } from './listar-conta-pagar.component';

describe('ListarContaPagarComponent', () => {
  let component: ListarContaPagarComponent;
  let fixture: ComponentFixture<ListarContaPagarComponent>;

  beforeEach(waitForAsync(() => {
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
