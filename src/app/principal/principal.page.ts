import { Component, OnInit } from '@angular/core';

declare var google;
@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  map = null;
  constructor() { }

  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create LatLng object
    const myLatLng = {lat: 5.058859029717547, lng: -75.48927077310586};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 17
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      // this.renderMarkers();
      mapEle.classList.add('show-map');
    });
  }

  ngOnInit() {
    this.loadMap();
  }

}
