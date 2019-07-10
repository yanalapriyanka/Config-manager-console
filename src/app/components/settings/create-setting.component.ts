import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-setting',
  templateUrl: './create-setting.component.html',
  styles: []
})
export class CreateSettingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onClickSubmit(setting: any): void {
    console.log(setting);
  }
}
