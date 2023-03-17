import { Component, OnInit, AfterViewInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({

  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements AfterViewInit,  OnInit {

  ngOnInit(): void {

  }
  ngAfterViewInit (): void
  {
    const socialListScrollbar = new PerfectScrollbar( '.dashboard-social-list' );
    const topCountriesScrollbar = new PerfectScrollbar( '.dashboard-top-countries' );
  }

}
