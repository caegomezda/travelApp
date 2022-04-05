import { Component, Input, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  {
  @Input() Menu:string;
  
  constructor(private menu: MenuController) { }

  OpenCloseMenu() {
    this.menu.toggle();
  }


}
