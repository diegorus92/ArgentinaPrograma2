import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Trabajo, Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class PorfolioService {

  apiUrl = "http://localhost:3000/usuarios";
  httpOptions = {
    headers: new HttpHeaders({'Content-type':'application/json'})
  }

  constructor(private http:HttpClient) { }

  obtenerDatos():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.apiUrl); 
  }

  obtenerDatosPorId(id:number):Observable<Usuario>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Usuario>(url);
  }

  actualizarUsuario(infoUsuario:Usuario, id:number): Observable<any>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch(url, infoUsuario, this.httpOptions);
  }

  generarId(trabajos:Trabajo[]):number{
    
    return trabajos.length > 0 ? Math.max(...trabajos.map(trabajo => trabajo.id))+1 : 1;
  }
}
