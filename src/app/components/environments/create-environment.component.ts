import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-environment',
  templateUrl: './create-environment.component.html',
  styles: []
})
export class CreateEnvironmentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onClickSubmit(environment: any): void {
    console.log(environment);
  }
}
