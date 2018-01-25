import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';

declare var plugin: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;

  constructor(public navCtrl: NavController, private platform: Platform) {

  }

  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.initMap();
    });
  }

  initMap(){

    this.map = GoogleMaps.create('map');

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.map.addEventListener(plugin.google.maps.event.MAP_CLICK).subscribe((data) => {
        alert('DATA -> ' + data);
        
        this.map.addMarker({
          position: data, 
          animation: 'DROP',
          draggable: true
        }).then(() =>{
          alert('Succesfully added a marker!');
        });
      });
    }).catch( error => {
      alert('ERROR -> ' + error);
    });
  }

}
