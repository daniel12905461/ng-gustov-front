import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUsuariosComponent } from './create-usuarios.component';

describe('CreateUsuariosComponent', () => {
  let component: CreateUsuariosComponent;
  let fixture: ComponentFixture<CreateUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUsuariosComponent]
    });
    fixture = TestBed.createComponent(CreateUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
