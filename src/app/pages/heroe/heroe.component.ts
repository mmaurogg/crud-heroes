import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';
import { Observable } from 'rxjs';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();


  constructor( private heroesService: HeroesService,
              private route: ActivatedRoute ) { }

  ngOnInit(): void {

    const id:any = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo'){
      this.heroesService.getHeroe(id).subscribe( (resp: any) => {
        this.heroe = resp;
        this.heroe.id = id;
      });
    }

  }

  guardar( form: NgForm ) {
    if( form.invalid){
      console.log("Formulario invalido")
      return;
    }

    Swal.fire({
      title: 'Espere por favor',
      text: 'Guardando Heroe',
      icon:'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.heroe.id) {
      peticion = this.heroesService.actualizarHeroe( this.heroe );
    } else {
      peticion = this.heroesService.crearHeroe( this.heroe );
    }
    
    peticion.subscribe( resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        icon:'success',
      });
    });

    

  }

}
