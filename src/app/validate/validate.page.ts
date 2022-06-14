import { Component, OnInit } from '@angular/core';
import { SesionService } from 'src/services/sesion.service';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.page.html',
  styleUrls: ['./validate.page.scss'],
})
export class ValidatePage implements OnInit {

  constructor(private sesion: SesionService) { }

  ionViewWillEnter(){
    this.sesion.sesionCaller()
  }

  ngOnInit() {
  }

}
