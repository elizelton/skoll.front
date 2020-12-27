import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NovoUsuarioComponent } from './novo-usuario.component';

describe('NovoUsuarioComponent', () => {
  let component: NovoUsuarioComponent;
  let fixture: ComponentFixture<NovoUsuarioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
