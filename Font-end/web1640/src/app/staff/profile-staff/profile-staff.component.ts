import { Component, AfterViewInit, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-profile-staff',
  templateUrl: './profile-staff.component.html',
  styleUrls: ['./profile-staff.component.css']
})
export class ProfileStaffComponent implements AfterViewInit, OnInit {
  ngOnInit(): void {

  }
  constructor() {

  }
    ngAfterViewInit(): void {
    const socialListScrollbar = new PerfectScrollbar('.dashboard-social-list');
    const topCountriesScrollbar = new PerfectScrollbar('.dashboard-top-countries');
  
  }

}
