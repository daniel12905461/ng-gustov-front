import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { debounceTime, delay, filter, finalize, map, takeUntil, tap } from 'rxjs/operators';
import { AlertSwallService } from 'src/app/core/service/alert-swall.service';
import { DiaLaboralesService } from 'src/app/service/dia-laborales.service';
import { EmpleadosService } from 'src/app/service/empleados.service';
import { SolicitudesService } from 'src/app/service/solicitudes.service';
import { VacacionesService } from 'src/app/service/vacaciones.service';

@Component({
  selector: 'app-solicitar-vacaciones',
  templateUrl: './solicitar-vacaciones.component.html',
  styleUrls: ['./solicitar-vacaciones.component.css'],
  providers: [DatePipe],
})
export class SolicitarVacacionesComponent {
  basicForm!: FormGroup;
  @Input() title!: string;
  @Input() id!: string;
  isLoading = false;
  empleados: any;
  diaLaborales: any;
  dia: any;
  diasAux: any;

  // select  ------> SELECT CON BUSCADOR
  public bankServerSideFilteringCtrl: FormControl = new FormControl();
  public searching: boolean = false;
  protected _onDestroy = new Subject<void>();

  get diaArray(): FormArray {
    return this.basicForm.get('dias') as FormArray;
  }
  
  constructor(
    private formBuilder: FormBuilder,
    // public activeModal: NgbActiveModal,
    // public baseService: VacacionesService,
    public baseService: SolicitudesService,
    public empleadosService: EmpleadosService,
    public diaLaboralesService: DiaLaboralesService,
    public alertSwal: AlertSwallService,
    public router: Router,
    private datePipe: DatePipe,
    public activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    moment.locale('es');
    this.createForm();
    this.listEmpleados({'term':''});
    this.listDiaLaborales();

    if (this.activatedRoute.snapshot.queryParams['edit']) {
      this.baseService.getById(this.activatedRoute.snapshot.queryParams['id']).subscribe(data => {
        this.basicForm.patchValue({
          // anio_id: data.data.nombres,
          empleado_id: data.data.vacacion.empleado.id,
          fecha_inicio: data.data.dias[0].fecha,
          fecha_fin: data.data.dias[data.data.dias.length-1].fecha,
          dias_restantes: data.data.vacacion.dias_restantes,
          dias_vacaciones: data.data.vacacion.dias_vacaciones,
          dias_solicitados: data.data.dias.length
        });
        this.llenarDias(data.data.dias);
      });
    }

    // select  ------> SELECT CON BUSCADOR
    this.bankServerSideFilteringCtrl.valueChanges
    .pipe(
      filter(search => !!search),
      tap(() => this.searching = true),
      takeUntil(this._onDestroy),
      debounceTime(200),
      map(search => {
        this.listEmpleados({'term':search});
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
    
    this.dia = <FormArray>this.basicForm.controls['dias'];

    this.basicForm.get('empleado_id')?.valueChanges.subscribe((data: any) => {
      this.empleadosService.getVacacionesEmpleado(data).subscribe((res: any) => {
        this.basicForm.get('dias_restantes')?.setValue(res.data.vacaciones[0].dias_restantes)
      });
    })

    // this.basicForm.get('fecha_fin')?.valueChanges.subscribe((data: any) => {
    //   (<FormArray>this.basicForm.controls['dias']).clear();
    //   this.diasAux = this.calcularDias();
    //   for (let index = 0; index < this.diasAux.length; index++) {
    //     this.dia.push(this.crearDia());
    //   }
    //   this.basicForm.patchValue({ dias: this.diasAux });
    // })
  }

  createForm() {
    this.basicForm = this.formBuilder.group({
      anio_id: [1, [Validators.required]],
      empleado_id: [0, [Validators.required]],
      fecha_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
      dias_restantes: [0, [Validators.required]],
      dias_vacaciones: [''],
      dias_solicitados: [0, [Validators.required]],
      dias: this.formBuilder.array([]),
    });
  }

  crearDia(): FormGroup {
    return this.formBuilder.group({
      id: '',
      nombre: '',
      fecha: '',
    });
  }

  register(basicForm: any) {
    this.isLoading = true;
    // debugger;
    if (this.basicForm.get('dias_solicitados')?.value > this.basicForm.get('dias_restantes')?.value) {
      this.alertSwal.showSwallError('Los Dias a Solicitados no pueden ser mayor que Dias a Restantes');
      this.isLoading = false;
    } else {
      if (this.activatedRoute.snapshot.queryParams['edit']) {
        this.baseService
          .update(this.activatedRoute.snapshot.queryParams['id'],basicForm)
          .pipe(
            finalize(() => {
              this.basicForm.markAsPristine();
              this.isLoading = false;
            })
          )
          .subscribe(
            data => {
              this.alertSwal.showSwallSuccess(data.success);
              this.router.navigate(['/dashboard/vacaciones']);
            },
            (error: any) => {
              this.alertSwal.showSwallError(error.error);
            }
          );
        
      }else{
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
              this.alertSwal.showSwallSuccess(data.success);
              this.router.navigate(['/dashboard/vacaciones']);
            },
            (error: any) => {
              this.alertSwal.showSwallError(error.error);
            }
          );

      }
    }
  }

  listEmpleados(data: any){
    this.empleadosService.getAll(data).subscribe(res => {
      this.empleados = res.data.data;
      console.log(res);
    });
  }
  
  listDiaLaborales(){
    this.diaLaboralesService.getById('1').subscribe(res => {
      this.diaLaborales = res.data;
      console.log(res);
    });
  }
  
  changeFechaFin(){
    (<FormArray>this.basicForm.controls['dias']).clear();
    this.diasAux = this.calcularDias();
    this.basicForm.get('dias_solicitados')?.setValue(this.diasAux.length);
    for (let index = 0; index < this.diasAux.length; index++) {
      this.dia.push(this.crearDia());
    }
    this.basicForm.patchValue({ dias: this.diasAux });
  }


  llenarDias(diasList: any){
    for (let index = 0; index < diasList.length; index++) {
      this.dia.push(this.crearDia());
    }
    this.basicForm.patchValue({ dias: diasList });
  }

  quitarDia(item: any) {
    for (let i = 0; i < this.dia.controls.length; i++) {
      if (item === i) {
        (<FormArray>this.basicForm.controls['dias']).removeAt(i);
      }
    }
    this.basicForm.get('dias_solicitados')?.setValue(this.dia.controls.length);
  }

  calcularDias() {
    const fechaInicio = this.basicForm.get('fecha_inicio')?.value;
    const fechaFin = this.basicForm.get('fecha_fin')?.value;

    const fechasConDias = [];
    const fechaActual = moment(fechaInicio);

    while (fechaActual.isSameOrBefore(fechaFin)) {
      const fechaFormateada = fechaActual.format('YYYY-MM-DD');
      const nombreDia = fechaActual.format('dddd');

      fechasConDias.push({ fecha: fechaFormateada, nombre: nombreDia });

      fechaActual.add(1, 'days');
    }

    console.log(fechasConDias);

    // Normalizar los nombres de los días a minúsculas y quitar acentos
    const arrayFechasFiltrado = [];
    for (const fecha of fechasConDias) {
      const nombreDia = fecha.nombre
        .toLowerCase() // Convertir a minúsculas
        .normalize("NFD") // Normalizar a la forma de descomposición
        .replace(/[\u0300-\u036f]/g, ""); // Eliminar acentos

      if (this.diaLaborales[this.capitalizarPrimeraLetra(nombreDia)] !== 0) {
        arrayFechasFiltrado.push(fecha);
      }
    }
    
    console.log(arrayFechasFiltrado);

    // this.basicForm.get('dias_solicitados')?.setValue(arrayFechasFiltrado.length);
    // this.basicForm.get('dias')?.setValue(arrayFechasFiltrado);

    return arrayFechasFiltrado;
  }

  capitalizarPrimeraLetra(str: any) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
