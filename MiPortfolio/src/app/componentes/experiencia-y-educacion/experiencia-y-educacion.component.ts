import { Component, OnInit, Input } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Trabajo, Usuario } from 'src/app/interfaces/usuario.interface';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-experiencia-y-educacion',
  templateUrl: './experiencia-y-educacion.component.html',
  styleUrls: ['./experiencia-y-educacion.component.css']
})
export class ExperienciaYEducacionComponent implements OnInit {

  @Input() usuarioActual!:Usuario;
  @Input() id!:number;
  idTrabajoActual!:number;
  edicion: boolean = false;
  btn_agregar: boolean = false;
  trabajoForm = this.formBuilder.group({
    nombre: '',
    logo: '',
    horario_entrada: '',
    horario_salida: '',
    descripcion: '',
  });

  NuevoTrabajoForm = this.formBuilder.group({
    nombre: '',
    logo: '',
    horario_entrada: '',
    horario_salida: '',
    descripcion: '',
  });


  constructor(
    private datosPortfolio:PorfolioService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.crearNuevoTrabajo();
  }

  onEditarTrabajo(idTrabajo:number){
    this.edicion = !this.edicion;
    this.idTrabajoActual = idTrabajo;
    console.log("Editando Trabajo...", this.edicion, "id trabajo= ", this.idTrabajoActual);
  }


  onSubmit():void{
    console.log("Guardando edicion de trabajo...");
    if(this.trabajoForm.value && this.usuarioActual){
      this.datosPortfolio.actualizarUsuario(this.usuarioActual, this.usuarioActual.id as number).subscribe();
      console.log("Edición realizada: ", this.trabajoForm.value);
    }
  }

  onAgregarTrabajo():void{
    this.btn_agregar = !this.btn_agregar;
    console.log("Agregando nuevo trabajo: ", this.btn_agregar);
  }

  guardarNuevoTrabajo():void{
    console.log("Trabajo nuevo guardado!", this.NuevoTrabajoForm.value);
    this.NuevoTrabajoForm.reset();
  }

  crearNuevoTrabajo():void{ //Dentro hay que crear el nuevo trabajo, crear su ID y agregarsela, y finalmente grabarlo en la DB
    this.datosPortfolio.obtenerDatosPorId(this.id)
    .pipe(
      tap((usuario) => {
        let trabajosUsuario:Trabajo[] = usuario.trabajos as Trabajo[];
        console.log("Cant. Trabajos del usuario:=> ", this.datosPortfolio.generarId(trabajosUsuario));
        console.log("Los trabajos: ", trabajosUsuario);
      })
    )
    .subscribe()
  }
}
