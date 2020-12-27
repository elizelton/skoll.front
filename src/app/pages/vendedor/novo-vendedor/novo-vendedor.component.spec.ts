import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NovoVendedorComponent } from './novo-vendedor.component';

describe('NovoVendedorComponent', () => {
  let component: NovoVendedorComponent;
  let fixture: ComponentFixture<NovoVendedorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoVendedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
