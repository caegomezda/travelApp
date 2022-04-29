import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  edit: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  editData(){
    this.edit=true;
  }
  saveData(){
    this.edit=false;
  }
}
