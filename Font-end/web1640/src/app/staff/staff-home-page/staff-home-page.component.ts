import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-home-page',
  templateUrl: './staff-home-page.component.html',
  styleUrls: ['./staff-home-page.component.css']
})
export class StaffHomePageComponent implements OnInit {
  ngListEvent = [ "All Event", "Category 1", "Department1","All Idea"];
  ngListCategory = [ "All Category", "Category 1", "Category 2","Category3"];
  ngListDepartment = [ "All Department", "Department 1", "Department 2","Department3"];
  ngFilterIdea =[ "All Idea", "Most Popular Idea", "Most Viewed Idea","Least Idea"];
  constructor() { }

  ngOnInit(): void {
  }

}


