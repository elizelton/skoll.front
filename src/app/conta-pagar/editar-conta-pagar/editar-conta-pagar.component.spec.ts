import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditarContaPagarComponent } from './editar-conta-pagar.component';

describe('EditarContaPagarComponent', () => {
  let component: EditarContaPagarComponent;
  let fixture: ComponentFixture<EditarContaPagarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarContaPagarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarContaPagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
