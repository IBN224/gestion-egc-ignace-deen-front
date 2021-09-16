import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  url1 = "assets/img/slide/slide-1.jpg";
  constructor() { }

  ngOnInit() {
  }

}
