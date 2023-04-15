import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { NgToastService } from 'ng-angular-popup';
import { SuccessDialogComponentComponent } from 'src/app/admin/create-account/success-dialog-component/success-dialog-component.component';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
@Component({
   templateUrl: './dash-board.component.html',
   styleUrls: ['./dash-board.component.css']
})

export class DashBoardComponent implements OnInit {

   constructor(public dialog: MatDialog, private api: ApiService, private router: Router,
      private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private toast: NgToastService) { }
   ngDashboard!: any;
   ngOnInit(): void {
      this.api.getDashboard().subscribe((res: any) => {
         this.ngDashboard = res;
         console.log(this.ngDashboard);
      }, (err: any) => {
         this.toast.error({detail: "Get dashboard failed!", position: "top-right",duration: 3000});
         console.log(err);
      }
      )

   }
   highcharts = Highcharts;
   // chartOptions: any = {
   //    chart: {
   //       type: 'bar'
   //    },
   //    title: {
   //       text: 'Number idea of category'
   //    },
   //    //   subtitle : {
   //    //      text: 'Source: Wikipedia.org'  
   //    //   },
   //    legend: {
   //       layout: 'vertical',
   //       align: 'left',
   //       verticalAlign: 'top',
   //       x: 250,
   //       y: 100,
   //       floating: true,
   //       borderWidth: 1,

   //       backgroundColor: (
   //          (Highcharts.theme && Highcharts.theme.legend) ||
   //          '#FFFFFF'), shadow: true
   //    },
   //    xAxis: {
   //       categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'], title: {
   //          text: null
   //       }
   //    },
   //    yAxis: {
   //       min: 0, title: {
   //          text: 'Population (millions)', align: 'high'
   //       },
   //       labels: {
   //          overflow: 'justify'
   //       }
   //    },
   //    tooltip: {
   //       valueSuffix: ' millions'
   //    },
   //    plotOptions: {
   //       bar: {
   //          dataLabels: {
   //             enabled: true
   //          }
   //       },
   //       series: {
   //          stacking: 'normal'
   //       }
   //    },
   //    credits: {
   //       enabled: false
   //    },
   //    series: [
   //       {
   //          name: 'Year 1800',
   //          data: [107, 31, 635, 203, 2]
   //       },
   //       {
   //          name: 'Year 1900',
   //          data: [133, 156, 947, 408, 6]
   //       },
   //       {
   //          name: 'Year 2008',
   //          data: [973, 914, 4054, 732, 34]
   //       }
   //    ]
   // };


   chartOptions2: any = {
      chart: {
         type: 'bar',
      },
      title: {
         text: 'Number idea of category',
      },
      xAxis: {
         categories: ["IT", "HR", "Marketing", "Sales", "Finance", "Admin"],
         title: {
            text: 'Number of Ideas',
         },
      },
      yAxis: {
         title: {
            text: 'Category',
         },
      },
      tooltip: {
         headerFormat: '<span style="font-size:10px">{point.key}</span><br/>',
         pointFormat: '<b>{point.y}</b> ideas',
      },
      series: [
         {
            name: 'Number of Ideas',
            data: [107, 31, 635, 203, 2],
         },
      ],
   };


   chartOptions3: any = {
      chart: {
         type: 'pie',
         width: 400,
         height: 300,
      },
      title: {
         text: 'Total ideas by event',
      },
      series: [
         {
            name: 'Total ideas',
            data: [{
               name: 'Chrome',
               y: 70.67,
               sliced: true,
               selected: true
            }, {
               name: 'Edge',
               y: 14.77
            }, {
               name: 'Firefox',
               y: 4.86
            }, {
               name: 'Safari',
               y: 2.63
            }, {
               name: 'Internet Explorer',
               y: 1.53
            }, {
               name: 'Opera',
               y: 1.40
            }, {
               name: 'Sogou Explorer',
               y: 0.84
            }, {
               name: 'QQ',
               y: 0.51
            }, {
               name: 'Other',
               y: 2.6
            }],
            showInLegend: true,
         },
      ],
      tooltip: {
         pointFormat: '<b>{point.y}</b> ideas',
      },
      plotOptions: {
         pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
               enabled: true,
               format: '<b>{point.name}</b>: {point.y} ideas',
            },
            showInLegend: true,
         },
      },
      legend: {
         align: 'right',
         layout: 'vertical',
         verticalAlign: 'middle',
      },
   };



   chartOptions4: any = {
      title: {
         text: 'Likes, Dislikes and Comments over 12 Months',
      },
      xAxis: {
         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yAxis: {
         title: {
            text: 'Count',
         },
      },
      legend: {
         layout: 'horizontal',
         align: 'center',
         verticalAlign: 'bottom',
      },
      series: [
         {
            name: 'Likes',
            data: [5, 6, 7, 8, 4],
         },
         {
            name: 'Dislikes',
            data: [2, 3, 5, 7, 6]
         },
         {
            name: 'Comments',
            data: [5, 3, 4, 7, 2],
         },
      ],
   }



   chartOptions5: any = {
      chart: {
         type: 'column'
      },
      title: {
         text: 'Major trophies for some English teams',
         align: 'left'
      },
      xAxis: {
         categories: ['Arsenal', 'Chelsea', 'Liverpool', 'Manchester United']
      },
      yAxis: {
         min: 0,
         title: {
            text: 'Count trophies'
         },
         stackLabels: {
            enabled: true,
            style: {
               fontWeight: 'bold',
               color: ( // theme
                  Highcharts.defaultOptions.title!.style &&
                  Highcharts.defaultOptions.title!.style.color
               ) || 'gray',
               textOutline: 'none'
            }
         }
      },
      legend: {
         align: 'left',
         x: 70,
         verticalAlign: 'top',
         y: 70,
         floating: true,
         backgroundColor:
            Highcharts.defaultOptions.legend!.backgroundColor || 'white',
         borderColor: '#CCC',
         borderWidth: 1,
         shadow: false
      },
      tooltip: {
         headerFormat: '<b>{point.x}</b><br/>',
         pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      plotOptions: {
         column: {
            stacking: 'normal',
            dataLabels: {
               enabled: true
            }
         }
      },
      series: [{
         name: 'BPL',
         data: [3, 5, 1, 13]
      }, {
         name: 'FA Cup',
         data: [14, 8, 8, 12]
      }, {
         name: 'CL',
         data: [0, 2, 6, 3]
      }]
   }




}