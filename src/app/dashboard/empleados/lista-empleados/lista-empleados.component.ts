import { Component } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AlertSwallService } from 'src/app/core/service/alert-swall.service';
import { EmpleadosService } from 'src/app/service/empleados.service';
import { CrearEmpleadosComponent } from '../crear-empleados/crear-empleados.component';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent {
  objs!: any;
  objsPaginado!: any;
  modalOptions: NgbModalOptions = {};
  currentPage: number = 1; // Página actual
  lastPage: number = 1; // Última página

  constructor(
    private modalService: NgbModal,
    private baseService: EmpleadosService,
    public alertSwal: AlertSwallService
    ) { }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.baseService.getAll({page:1}).subscribe(res => {
      this.objs = res.data.data;
      this.objsPaginado = res.data;
      this.currentPage = res.data.current_page;
      this.lastPage = res.data.last_page;
    });
  }
  
  nextPage() {
    if (this.currentPage < this.lastPage) {
      this.currentPage++;
      this.loadPage(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPage(this.currentPage);
    }
  }

  loadPage(page: any) {
    this.baseService.nextPage(page).subscribe((res: any) => {
      this.objs = res.data.data;
      this.objsPaginado = res.data;
      this.currentPage = res.data.current_page;
      this.lastPage = res.data.last_page;
    });
  }

  create(){
    const modalRef = this.modalService.open(
      CrearEmpleadosComponent,
      this.modalOptions
    );
    modalRef.componentInstance.title = 'Crear nuevo Empleado';
    modalRef.componentInstance.id = null;

    modalRef.result.then(result => {
      if (result) {
        this.list();
      }
    }).catch(error => {
      console.log('Error:', error);
    });
  }

  edit(id: any){
    const modalRef = this.modalService.open(
      CrearEmpleadosComponent,
      this.modalOptions
    );
    modalRef.componentInstance.title = 'Editar Empleado';
    modalRef.componentInstance.id = id;

    modalRef.result.then(result => {
      if (result) {
        this.list();
      }
    });

  }

  eliminar(id: any){
    this.alertSwal
      .showConfirm({
        title: 'Esta seguro de eliminar?',
        text: 'la accion no podra revertirse...!',
        icon: 'warning'
      })
      .then(res => {
        // console.log(res);
        if (res.value === true) {
          this.baseService.delete(id).subscribe(
            (data: any) => {
              // console.log(res);
              this.alertSwal.showSwallSuccess(data.success);
              this.list();
            },
            (error: any) => this.alertSwal.showSwallError(error.error)
          );
        }
      });
  }

  enable(id: any) {
    this.baseService.enabled(id).subscribe(
      data => {
        this.list();
      },
      error => {
        // console.log('error ' + error);
        this.alertSwal.showSwallError(error.error);
        this.list();
      }
    );
  }

  getLinkText(label: string): string {
    // Lógica para determinar el texto del enlace
    label = label.toLowerCase();
    return label.includes('previous') ? 'Antes' : (label.includes('next') ? 'Siguiente' : label);
  }
}
