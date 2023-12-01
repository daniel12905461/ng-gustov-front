import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEmpleadosComponent } from './crear-empleados.component';

describe('CrearEmpleadosComponent', () => {
  let component: CrearEmpleadosComponent;
  let fixture: ComponentFixture<CrearEmpleadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearEmpleadosComponent]
    });
    fixture = TestBed.createComponent(CrearEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
