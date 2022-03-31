import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonGuardadoComponent } from './boton-guardado.component';

describe('BotonGuardadoComponent', () => {
  let component: BotonGuardadoComponent;
  let fixture: ComponentFixture<BotonGuardadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonGuardadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonGuardadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
