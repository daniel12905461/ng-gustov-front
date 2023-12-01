import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarVacacionesComponent } from './solicitar-vacaciones.component';

describe('SolicitarVacacionesComponent', () => {
  let component: SolicitarVacacionesComponent;
  let fixture: ComponentFixture<SolicitarVacacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitarVacacionesComponent]
    });
    fixture = TestBed.createComponent(SolicitarVacacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
