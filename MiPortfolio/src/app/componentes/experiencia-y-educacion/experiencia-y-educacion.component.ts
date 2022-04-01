import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { PorfolioService } from 'src/app/servicios/porfolio.service';

@Component({
  selector: 'app-experiencia-y-educacion',
  templateUrl: './experiencia-y-educacion.component.html',
  styleUrls: ['./experiencia-y-educacion.component.css']
})
export class ExperienciaYEducacionComponent implements OnInit {

  usuarioActual!:Usuario;
  id:number = 1;

  constructor(private datosPortfolio:PorfolioService) { }

  ngOnInit(): void {

    this.datosPortfolio.obtenerDatosPorId(this.id)
    .pipe(
      tap(data => {
      this.usuarioActual = data;
    })
    )
    .subscribe()
  }

}
