import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { Usuario } from './interfaces/usuario.interface';
import { PorfolioService } from './servicios/porfolio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MiPortfolio';
  listaUsuarios!: Usuario[];
  usuario!: Usuario;
  idUsuario: number = 1;

  constructor(private datosPortfolioSvc: PorfolioService){}

  ngOnInit(): void {
    this.datosPortfolioSvc.obtenerDatos()
    .pipe(
      tap(data => {
        console.log("Todos los usuarios: ", data);
        this.listaUsuarios = data;
      })
    )
    .subscribe(usuarios => this.listaUsuarios = usuarios);

    this.datosPortfolioSvc.obtenerDatosPorId(this.idUsuario)
    .pipe(
      tap((usuario: Usuario) => console.log(`Usuario obtenido por ID (${this.idUsuario}): `,usuario)),
      tap((usuario: Usuario) => this.usuario = usuario)
    )
    .subscribe();
  }

}
