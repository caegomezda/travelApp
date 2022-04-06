import { Component } from '@angular/core';
import {Geolocation,PositionOptions} from "@capacitor/geolocation";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  location:any={};
  keys:string[]=[];

  constructor() {}

    getPosition(){
      var options:PositionOptions={
        enableHighAccuracy:true
      }
    Geolocation.getCurrentPosition(options).then((res)=>{
            this.location = res.coords;
            this.keys = Object.keys(this.location);
    }, (err)=>{
      alert(JSON.stringify(err));
    })
  }
}
