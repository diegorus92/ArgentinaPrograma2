import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';

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

  actualizarCabecera(infoUsuario:Usuario): Observable<any>{
    return this.http.patch(this.apiUrl+"/1", infoUsuario, this.httpOptions);
  }
}
