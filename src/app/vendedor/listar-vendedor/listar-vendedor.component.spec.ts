import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListarVendedorComponent } from './listar-vendedor.component';

describe('ListarVendedorComponent', () => {
  let component: ListarVendedorComponent;
  let fixture: ComponentFixture<ListarVendedorComponent>;

  beforeEach(waitForAsync(() => {
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
