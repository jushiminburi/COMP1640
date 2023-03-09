import { Component, AfterViewInit, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.css']
})
export class IdeaComponent  implements AfterViewInit, OnInit{
  ngOnInit(): void {

  }
  constructor(){}
  ngAfterViewInit(): void {
    const socialListScrollbar = new PerfectScrollbar('.dashboard-social-list');
    const topCountriesScrollbar = new PerfectScrollbar('.dashboard-top-countries');
  }
}



