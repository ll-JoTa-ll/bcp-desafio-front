import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-tipo-cambio',
  templateUrl: './tipo-cambio.component.html',
  styleUrls: ['./tipo-cambio.component.sass'],
})
export class TipoCambioComponent implements OnInit {
  model: any = {};
  lstTC: any[] = [];
  tc: any;
  monto = 0;
  resultado = 0;

  constructor(private apiServive: ApiService) {}

  ngOnInit(): void {
    this.listarTC();
  }

  listarTC() {
    var token = localStorage.getItem('token');
    console.log('token: ' + token);
    this.apiServive.listarTipoCambio(token).subscribe(
      (result: any) => {
        console.log(result.list);
        this.lstTC = result.list;
        this.tc = this.lstTC[0];
      },
      (err: any) => {},
      () => {}
    );
  }

  selTC(tc) {
    this.tc = tc;
  }

  calcular() {
    console.log('calcular');
    console.log('this.monto: ' + this.monto);
    console.log('this.tc.monedaOrigen: ' + this.tc.monedaOrigen);
    console.log('this.tc.monedaDestino: ' + this.tc.monedaDestino);

    var token = localStorage.getItem('token');
    this.apiServive
      .obtenerTipoCambio(
        this.monto,
        this.tc.monedaOrigen,
        this.tc.monedaDestino,
        token
      )
      .subscribe(
        (result: any) => {
          console.log(result);
          this.resultado = result.montoTipoCambioCalculado.montoCalculado;
        },
        (err: any) => {},
        () => {}
      );
  }
}
