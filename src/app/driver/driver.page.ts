import { Component, OnInit } from '@angular/core';
import { ComponentsIonicService } from '../services/components-ionic.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.page.html',
  styleUrls: ['./driver.page.scss'],
})
export class DriverPage implements OnInit {

  constructor(public componentsIonic: ComponentsIonicService) { }

  ngOnInit() {
  }
  presentarAlerta(){
    this.componentsIonic.presentAlertConfirm();
  }
}
