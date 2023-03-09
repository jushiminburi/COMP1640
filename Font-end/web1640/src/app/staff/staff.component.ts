import { AfterViewInit, Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { Router, NavigationEnd } from '@angular/router';

@Component({

  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements AfterViewInit, OnInit {
  ngOnInit (): void
  {
  }

  ngAfterViewInit(): void {
    const socialListScrollbar = new PerfectScrollbar('.dashboard-social-list');
    const topCountriesScrollbar = new PerfectScrollbar('.dashboard-top-countries');
  }
}
