import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVendedorComponent } from './editar-vendedor.component';

describe('EditarVendedorComponent', () => {
  let component: EditarVendedorComponent;
  let fixture: ComponentFixture<EditarVendedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarVendedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
