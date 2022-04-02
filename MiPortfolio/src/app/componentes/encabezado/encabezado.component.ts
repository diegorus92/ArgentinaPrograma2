import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import {PorfolioService} from '../../servicios/porfolio.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  miPortfolio!:Usuario[];
  editar: boolean = false;
  usuarioActual!:Usuario;
  id:number = 1;

  usuarioForm = this.formBuilder.group({
    name: '',
    ocupacion: '', 
    provincia: '',
    pais: '',
  });

  constructor(
    private datosPortfolio:PorfolioService,
    private formBuilder:FormBuilder
    ) { }

  ngOnInit(): void {

    this.datosPortfolio.obtenerDatos()
    .pipe(
      tap(data => {
        console.log("Todos los usuarios: ", data);
        this.miPortfolio = data;
      })
    )
    .subscribe();

    this.datosPortfolio.obtenerDatosPorId(this.id)
    .pipe(
      tap((usuario: Usuario) => console.log(`Usuario obtenido por ID (${this.id}): `,usuario)),
      tap((usuario: Usuario) => this.usuarioActual = usuario)
    )
    .subscribe()
  }



  onEditar(): void {
    this.editar = !this.editar;
    console.log("Edicion: ", this.editar);
  }

  onSubmit(): void {
    console.log("Guardado!", this.usuarioForm.value);
    this.usuarioActual = this.usuarioForm.value as Usuario;
    console.log("usuarioActual = ", this.usuarioActual);

    if(this.usuarioActual){
      this.datosPortfolio.actualizarCabecera(this.usuarioActual, this.id).subscribe();
    }
    //this.usuarioForm.reset();
  }
}
