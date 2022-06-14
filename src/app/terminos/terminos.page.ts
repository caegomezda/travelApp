import { Component, OnInit } from '@angular/core';
import { SesionService } from 'src/services/sesion.service';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.page.html',
  styleUrls: ['./terminos.page.scss'],
})
export class TerminosPage implements OnInit {

  constructor(private sesion: SesionService) { }

  ionViewWillEnter(){
    this.sesion.sesionCaller()
  }
  
  ngOnInit() {
  }

}
