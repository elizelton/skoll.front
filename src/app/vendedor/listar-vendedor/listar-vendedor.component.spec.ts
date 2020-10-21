import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarVendedorComponent } from './listar-vendedor.component';

describe('ListarVendedorComponent', () => {
  let component: ListarVendedorComponent;
  let fixture: ComponentFixture<ListarVendedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarVendedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
