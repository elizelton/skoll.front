import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListarContratoComponent } from './listar-contrato.component';

describe('ListarContratoComponent', () => {
  let component: ListarContratoComponent;
  let fixture: ComponentFixture<ListarContratoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
