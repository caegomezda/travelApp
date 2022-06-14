import { Component, OnInit } from '@angular/core';
import { SesionService } from 'src/services/sesion.service';

@Component({
  selector: 'app-contac',
  templateUrl: './contac.page.html',
  styleUrls: ['./contac.page.scss'],
})
export class ContacPage implements OnInit {

  constructor(private sesion : SesionService ) { }

  ionViewWillEnter(){
    this.sesion.sesionCaller()
  }
  
  ngOnInit() {
  }

}
