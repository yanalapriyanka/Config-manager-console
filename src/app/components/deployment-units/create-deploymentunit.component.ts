import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-deploymentunit',
  templateUrl: './create-deploymentunit.component.html',
  styles: []
})
export class CreateDeploymentunitComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  onClickSubmit(deployUnit: any): void {
    console.log(deployUnit);
  }
}
