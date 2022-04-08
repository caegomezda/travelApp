import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Input, Renderer2, ElementRef, Inject, ViewChild } from '@angular/core';


import { GoogleMapsService } from './google-maps.service';
import { Plugins } from '@capacitor/core';
// import { ModalController } from '@ionic/angular';

const {Geolocation} = Plugins;
declare var google: any;

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit {

  // coordenadas cuenca
    @Input () position = {
      lat: -2.898116,
      lng: -78.99958149999999
    };
    label = {
      titulo: 'Ubicación',
      subtitulo: 'Mi ubicación '
    }
    map: any;
    marker: any;
    infowindow: any;
    positionSet: any
    // public search:string='';
    @ViewChild('map') divMap: ElementRef;


  constructor(private renderer:Renderer2,
              @Inject(DOCUMENT) private document,
              private googlemapsService: GoogleMapsService,
              // public modalController: ModalController
              ) {
                // console.log(google);
               }


  ngOnInit(): void {
    this.init();
    // this.initMap();
  }
  async init() {
    this.googlemapsService.init(this.renderer, this.document). then( () =>{
            this.initMap();
    }).catch( (err) => {
           console. log(err);
    });
 }

 initMap() {
  const position = this.position;
  let latLng = new google.maps.LatLng (position.lat, position.lng);
  let mapOptions = {
        center: latLng,
        zoom: 15,
        disableDefaultUI: true,
        clickableIcons: false,
  };

  
  this.map = new google.maps.Map(this.divMap.nativeElement,mapOptions);

  this.marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        draggable: true,
  });

  this.clickHandleEvent ();
  this.infowindow = new google.maps.InfoWindow();
  // if (this.label.titulo.length) {
      this. addMarker (position);
      this.setInfoWindow(this.marker, this.label.titulo, this.label.subtitulo)
      
  // }

}

clickHandleEvent() {
  this.map.addListener('click', (event: any) => {
        const position = {
              lat: event. latLng. lat(),
              lng: event. latLng. lng(),
        };
        this.addMarker(position);
  });
}

  addMarker(position: any): void {
    let latLng = new google.maps.LatLng (position. lat, position.lng);
    this.marker.setPosition(latLng);
    this.map.panTo(position);
    this.positionSet = position;
  }

  setInfoWindow(marker: any, titulo: string, subtitulo: string) {
    const contentString = '<div id="contentInsideMap">'+
                          '<p style="font-weight: bold; margin-bottom: 5px;">'+ titulo + '</p>'
                          '<div id="bodyContent">' +
                          '<p>'+ subtitulo + '</p>'+
                          '</div>'+
                          '</div>';
    this.infowindow.setContent(contentString);
    this.infowindow.open(this.map, marker);
  }

  async myLocation() {
    console.log('mylocation() click')
    Geolocation.getCurrentPosition().then( (res) => {

           console. log('my location() - > get')

          const position = {
                 lat: res.coords.latitude,
                 lng: res.coords.longitude,
          }
           this.addMarker(position);
    });
  }


  // searchChanged(){
  //   console.log(this.search)
  // }
}
