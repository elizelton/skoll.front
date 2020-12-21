import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NovoProdutoComponent } from './novo-produto.component';

describe('NovoProdutoComponent', () => {
  let component: NovoProdutoComponent;
  let fixture: ComponentFixture<NovoProdutoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
