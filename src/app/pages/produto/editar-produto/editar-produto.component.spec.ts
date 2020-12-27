import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditarProdutoComponent } from './editar-produto.component';

describe('EditarProdutoComponent', () => {
  let component: EditarProdutoComponent;
  let fixture: ComponentFixture<EditarProdutoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
