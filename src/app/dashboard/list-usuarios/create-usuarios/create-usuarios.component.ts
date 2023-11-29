import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs';
import { AlertSwallService } from 'src/app/core/service/alert-swall.service';
import { UsuariosService } from 'src/app/service/usuarios.service';

@Component({
  selector: 'app-create-usuarios',
  templateUrl: './create-usuarios.component.html',
  styleUrls: ['./create-usuarios.component.css']
})
export class CreateUsuariosComponent implements OnInit {
  roles!: any[];
  // basicForm: FormGroup;
  // @Input() title: string;
  // @Input() id: string;
  basicForm!: FormGroup;
  @Input() title!: string;
  @Input() id!: string;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public baseService: UsuariosService,
    // public rolService: RolService,
    public alertSwal: AlertSwallService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.listRoles();

    if (this.id !== null) {
      this.baseService.getById(this.id).subscribe(data => {
        this.basicForm.patchValue({
          nombres: data.data.nombres,
          apellidos: data.data.apellidos,
          user: data.data.user,
          password: data.data.password,
        });
      });
    }
  }

  createForm() {
    this.basicForm = this.formBuilder.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      user: ['', [Validators.required]],
      password: [''],
    });
  }

  register(basicForm: any) {
    this.isLoading = true;
    if (this.id === null) {
      this.baseService
        .create(basicForm)
        .pipe(
          finalize(() => {
            this.basicForm.markAsPristine();
            this.isLoading = false;
          })
        )
        .subscribe(
          data => {
            // toastr.success('Exito!', data.success);
            this.alertSwal.showSwallSuccess(data.success);
            this.activeModal.close(data);
          },
          (error: any) => {
            // toastr.error('Error!', error.error);
            this.alertSwal.showSwallError(error.error);
          }
        );
    } else {
      this.baseService
        .update(this.id, basicForm)
        .pipe(
          finalize(() => {
            this.basicForm.markAsPristine();
            this.isLoading = false;
          })
        )
        .subscribe(
          data3 => {
            // toastr.success('Exito!', data3.success);
            this.alertSwal.showSwallSuccess(data3.success);
            this.activeModal.close(data3);
          },
          (error: any) => {
            // toastr.error('Error!', error.error);
            this.alertSwal.showSwallError(error.error);
          }
        );
    }
  }

  listRoles(){
    // this.rolService.getAll().subscribe(res => {
    //   this.roles = res.data;
    //   console.log(res);
    // });
  }
}
