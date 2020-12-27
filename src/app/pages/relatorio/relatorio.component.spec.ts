import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RelatorioComponent } from './relatorio.component';

describe('RelatorioComponent', () => {
  let component: RelatorioComponent;
  let fixture: ComponentFixture<RelatorioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
