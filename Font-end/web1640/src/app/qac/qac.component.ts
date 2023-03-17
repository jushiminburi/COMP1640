import { AfterViewInit, Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-qac',
  templateUrl: './qac.component.html',
  styleUrls: ['./qac.component.css']
})
export class QacComponent implements AfterViewInit, OnInit {
  ngOnInit(): void
    {

    }
    constructor(){}

  ngAfterViewInit(): void
    {
      const socialListScrollbar = new PerfectScrollbar( '.dashboard-social-list' );
      const topCountriesScrollbar = new PerfectScrollbar( '.dashboard-top-countries' );
    }




}
