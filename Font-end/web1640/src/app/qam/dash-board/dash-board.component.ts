import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
window.Chart = Chart

@Component({
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  PieChart = [];
  BarChart = [];

ngOnInit() {
  //barchart
    const BarChart = new Chart( "barChart", {
    type: 'bar',
      data: {
    labels: [ 'Department 1', 'Department 2', 'Departments 3', 'Departments 4', 'Departments 5', 'Departments 6' ],
    datasets: [ {
      label: 'Numbers Of Staff With Ideas Submitssion Per Departments',
      data: [ 12, 8, 6, 2, 7, 10 ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2
    } ]
  },
  options: {

      },
    
  });

  const PieChart = new Chart( "pieChart", {
    type: 'pie',
    data: {

      datasets: [ {
        label: 'Numbers Of Staff With Ideas Submissions Per Departments',
        data: [ 12, 8, 3, 5, 7, 3 ],
        backgroundColor: [
          'rgb(224, 89, 94)',
          'rgb(159, 223, 159)',
          'rgb(255, 235, 153)',
          'rgb(153, 221, 255)',
          'rgb(221, 204, 255)',
          'rgb(255, 204, 179)'
        ],
        borderColor: [
          'rgb(224, 89, 94)',
          'rgb(159, 223, 159)',
          'rgb(255, 235, 153)',
          'rgb(153, 221, 255)',
          'rgb(221, 204, 255)',
          'rgb(255, 204, 179)'
        ],
        borderWidth: 2
      } ],labels: [ 'Department 1', 'Department 2', 'Departments 3', 'Departments 4', 'Departments 5', 'Departments 6' ],
    }
  } );
}
}
