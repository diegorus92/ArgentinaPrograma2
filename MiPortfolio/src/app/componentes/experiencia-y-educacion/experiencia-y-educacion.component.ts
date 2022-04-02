import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Trabajo, Usuario } from 'src/app/interfaces/usuario.interface';
import { PorfolioService } from 'src/app/servicios/porfolio.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-experiencia-y-educacion',
  templateUrl: './experiencia-y-educacion.component.html',
  styleUrls: ['./experiencia-y-educacion.component.css']
})
export class ExperienciaYEducacionComponent implements OnInit {

  usuarioActual!:Usuario;
  id:number = 1;
  idTrabajoActual!:number;
  edicion: boolean = false;
  trabajoForm = this.formBuilder.group({
    nombre: '',
    logo: '',
    horario_entrada: '',
    horario_salida: '',
    descripcion: '',
  })

  constructor(
    private datosPortfolio:PorfolioService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {

    this.datosPortfolio.obtenerDatosPorId(this.id)
    .pipe(
      tap(data => {
      this.usuarioActual = data;
    })
    )
    .subscribe()
  }

  onEditarTrabajo(idTrabajo:number){
    this.edicion = !this.edicion;
    this.idTrabajoActual = idTrabajo;
    console.log("Editando Trabajo...", this.edicion, "id trabajo= ", this.idTrabajoActual);
  }

  onSubmit():void{
    console.log("Edición realizada: ", this.trabajoForm.value);
  }
}
