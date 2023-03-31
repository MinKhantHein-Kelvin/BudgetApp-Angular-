import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  Categories = [
    {
      id : 1,
      description : "Yangon"
    },
    {
      id : 2,
      description : "Naypritaw"
    },
    {
      id : 3,
      description : "Mandalay"
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
