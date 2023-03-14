import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

let httpOptions = {
  headers: new HttpHeaders(),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiTC: string = 'https://localhost:44327/tipocambio/';
  private apiLogin: string = 'https://localhost:44327/login/';

  constructor(
    private http: HttpClient //private sessionSt: SessionStorageService
  ) {}

  login(datos) {
    console.log(datos);
    console.log('url: ' + this.apiLogin + 'logintc');

    return this.http.post(this.apiLogin + 'logintc', datos);
  }

  obtenerTipoCambio(valor1, valor2, valor3, token) {
    httpOptions.headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });

    return this.http.get(
      this.apiTC + 'obtenerTipoCambio/' + valor1 + '/' + valor2 + '/' + valor3,
      httpOptions
    );
  }

  listarTipoCambio(token) {
    httpOptions.headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });

    console.log(this.apiTC + 'listar');
    console.log(this.apiTC + 'listar');

    return this.http.get(this.apiTC + 'listar', httpOptions);
  }

  updateTC(datos) {
    return this.http.post(this.apiTC + 'actualizar', datos);
  }
}
