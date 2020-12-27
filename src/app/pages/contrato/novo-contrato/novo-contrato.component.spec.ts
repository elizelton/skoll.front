import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NovoContratoComponent } from './novo-contrato.component';

describe('NovoContratoComponent', () => {
  let component: NovoContratoComponent;
  let fixture: ComponentFixture<NovoContratoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoContratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
