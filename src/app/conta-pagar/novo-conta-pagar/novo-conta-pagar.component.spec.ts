import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoContaPagarComponent } from './novo-conta-pagar.component';

describe('NovoContaPagarComponent', () => {
  let component: NovoContaPagarComponent;
  let fixture: ComponentFixture<NovoContaPagarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoContaPagarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoContaPagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
