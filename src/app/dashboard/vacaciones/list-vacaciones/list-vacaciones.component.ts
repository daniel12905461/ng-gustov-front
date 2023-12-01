import { Component } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AlertSwallService } from 'src/app/core/service/alert-swall.service';
import { VacacionesService } from 'src/app/service/vacaciones.service';
import { CrearEmpleadosComponent } from '../../empleados/crear-empleados/crear-empleados.component';
import { SolicitarVacacionesComponent } from '../solicitar-vacaciones/solicitar-vacaciones.component';
import { FormControl } from '@angular/forms';
import { Subject, debounceTime, delay, filter, map, takeUntil, tap } from 'rxjs';
import { SolicitudesService } from 'src/app/service/solicitudes.service';
import { VerPdfComponent } from '../../ver-pdf/ver-pdf.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-vacaciones',
  templateUrl: './list-vacaciones.component.html',
  styleUrls: ['./list-vacaciones.component.css']
})
export class ListVacacionesComponent {
  objs!: any;
  objsPaginado!: any;
  modalOptions: NgbModalOptions = {};
  currentPage: number = 1; // Página actual
  lastPage: number = 1; // Última página
  empleado_id: any;

  // select  ------> SELECT CON BUSCADOR
  public bankServerSideFilteringCtrl: FormControl = new FormControl();
  public searching: boolean = false;
  protected _onDestroy = new Subject<void>();

  constructor(
    private modalService: NgbModal,
    // private baseService: VacacionesService,
    private baseService: SolicitudesService,
    public alertSwal: AlertSwallService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.list();

    // select  ------> SELECT CON BUSCADOR
    this.bankServerSideFilteringCtrl.valueChanges
    .pipe(
      filter(search => !!search),
      tap(() => this.searching = true),
      takeUntil(this._onDestroy),
      debounceTime(200),
      map(search => {
        // this.listRemitentes(search);
      }),
      delay(500)
    )
    .subscribe((filteredBanks:any) => {
      this.searching = false;
      // console.log('B',filteredBanks);
    },
    error => {
      // no errors in our simulated example
      this.searching = false;
      // handle error...
    });
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
      SolicitarVacacionesComponent,
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
    this.router.navigate(['/dashboard/vacaciones/solicitar-vacaciones'], {
      queryParams: {
        id: id,
        edit: true
      }
    });
    // const modalRef = this.modalService.open(
    //   SolicitarVacacionesComponent,
    //   this.modalOptions
    // );
    // modalRef.componentInstance.title = 'Editar Empleado';
    // modalRef.componentInstance.id = id;

    // modalRef.result.then(result => {
    //   if (result) {
    //     this.list();
    //   }
    // });

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
    this.alertSwal
      .showConfirm({
        title: 'Esta seguro de Aprobar?',
        text: 'la accion no podra revertirse...!',
        icon: 'warning'
      })
      .then(res => {
        // console.log(res);
        if (res.value === true) {
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
      });
  }

  getLinkText(label: string): string {
    // Lógica para determinar el texto del enlace
    label = label.toLowerCase();
    return label.includes('previous') ? 'Antes' : (label.includes('next') ? 'Siguiente' : label);
  }
  
  verPdf(id: any){
    // this.isLoadingPdf = true;s
    this.baseService.pdfSolicitudHoja(id).subscribe((res: any) => {
      // this.isLoadingPdf = false;
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);

      const modal = this.modalService.open(
        VerPdfComponent, 
        {
          size: 'xl',
          backdrop: 'static',
          backdropClass: 'customBackdrop'
        }
      );
      modal.componentInstance.estado = true;
      modal.componentInstance.title = 'Recibo de Vacaciones';
      modal.componentInstance.pdfRuta = fileURL;
      modal.result.then(result => {
        if (result) {
          this.list();
        }
      });
    });

  }
}
