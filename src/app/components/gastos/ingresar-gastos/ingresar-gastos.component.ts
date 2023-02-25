import { Component, OnInit } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';


@Component({
  selector: 'app-ingresar-gastos',
  templateUrl: './ingresar-gastos.component.html',
  styleUrls: ['./ingresar-gastos.component.css']
})
export class IngresarGastosComponent implements OnInit {
nombreGastos:string;
cantidad:number;
formularioIncorrecto:boolean;
textIncorrecto:string;

  constructor(private _presupuestoService: PresupuestoService) { 
    this.nombreGastos = '';
    this.cantidad = 0;
    this.formularioIncorrecto = false;
    this.textIncorrecto = '';
  }

  ngOnInit(): void {
  }

  agregarGastos(){
    if(this.cantidad > this._presupuestoService.restante){
      this.formularioIncorrecto = true;
      this.textIncorrecto = 'Cantidad ingresada es mayor al restante';
      return;
    }


    if(this.nombreGastos === '' || this.cantidad <= 0){
      this.formularioIncorrecto = true;
      this.textIncorrecto = 'Nombre gastos o cantidad incorrecta'
    }else{

      //creamos el objeto

      const GASTOS = {
        nombre: this.nombreGastos,
        cantidad: this.cantidad,
      }

      //Enviamos el objeto a los suscriptores via subjet

      this._presupuestoService.agregarGastos(GASTOS);

      //Reseteamos formulario
      this.formularioIncorrecto = false;
      this.nombreGastos = '';
      this.cantidad = 0;
    }

  }

}
