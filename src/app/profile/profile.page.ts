import { Component, OnInit } from '@angular/core';
import { SesionService } from 'src/services/sesion.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  edit: boolean = false;

  constructor(private sesion: SesionService) { }

  ionViewWillEnter(){
    this.sesion.sesionCaller()
  }

  ngOnInit() {
  }

  editData(){
    this.edit=true;
  }
  
  saveData(){
    this.edit=false;
  }
}
