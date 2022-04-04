import { Component, OnInit, Input } from '@angular/core';
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

  @Input() miPortfolio!:Usuario[];
  editar: boolean = false;
  @Input() usuarioActual!:Usuario;
  @Input() id!:number;

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
      this.datosPortfolio.actualizarUsuario(this.usuarioActual, this.id).subscribe();
    }
    //this.usuarioForm.reset();
  }
}
