import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styles: []
})
export class EnvironmentsComponent implements OnInit {
  envColumns: any = ['Id', 'Name', 'Country'];
  environments: any = [
    {
         Id : 1,
         Name : 'Environment 1',
         Country : 'Germany'
     }, {
         Id : 2,
         Name : 'Environment 2',
         Country : 'Sweden'
     }, {
         Id : 3,
         Name : 'Environment 3',
         Country : 'Mexico'
     }, {
         Id : 4,
         Name : 'Environment 4',
         Country : 'Austria'
     }
 ];
  constructor() { }

  ngOnInit() {
  }

}
