import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListarProdutoComponent } from './listar-produto.component';

describe('ListarProdutoComponent', () => {
  let component: ListarProdutoComponent;
  let fixture: ComponentFixture<ListarProdutoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
