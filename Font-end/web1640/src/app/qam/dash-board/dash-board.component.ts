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
   dataCategory: any[] = [];
   dataDepartment: any[] = [];
   dataChartByMonth: any[] = [];
   highcharts = Highcharts;
   ngOnInit(): void {
      this.api.getDashboard().subscribe((res: any) => {
         this.ngDashboard = res.data;
         this.dataCategory = res.data.category;
         this.dataDepartment = res.data.department;
         this.dataChartByMonth = res.data.dataChartByMonth;
         
        this.dataChartByMonth.map((item: any) => { console.log(item)});

      //    this.chartOptions2.xAxis.categories = this.dataCategory.map((item: any) => item.name);
      //   this.chartOptions2.series[0].data = this.dataCategory.map((item: any) => item.count);
      //   Highcharts.chart('chart',this.chartOptions2);

      this.chartOptions2 = {
         chart: {
            type: 'bar',
         },
         title: {
            text: 'Number idea of category',
         },
         xAxis: {
            categories: res.data.category.map((item: any) => item.name),
            title: {
               text: 'Category',
            },
         },
         yAxis: {
            title: {
               
               text: 'Number of Ideas',
            },
         },
         tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><br/>',
            pointFormat: '<b>{point.y}</b> ideas',
         },
         series: [
            {
               name: 'Number of Ideas',
               data:  res.data.category.map((item: any) => item.totalIdea),
            },
         ],
      };


      this.chartOptions3 = {
         chart: {
            type: 'pie',
            // width: 400,
            // height: 300,
         },
         title: {
            text: 'Total ideas by department',
         },
         series: [
            {
               name: 'Total ideas',
               data: this.dataDepartment.map((item: any) => {
                  return {
                     name: item.name,
                     y: item.totalIdea ,
                     
                  }
               }),
               // data: [{
               //    name: 'Chrome',
               //    y: 70.67,
               //    sliced: true,
               //    selected: true
               // }, {
               //    name: 'Edge',
               //    y: 14.77
               // }, {
               //    name: 'Firefox',
               //    y: 4.86
               // }, {
               //    name: 'Safari',
               //    y: 2.63
               // }, {
               //    name: 'Internet Explorer',
               //    y: 1.53
               // }, {
               //    name: 'Opera',
               //    y: 1.40
               // }, {
               //    name: 'Sogou Explorer',
               //    y: 0.84
               // }, {
               //    name: 'QQ',
               //    y: 0.51
               // }, {
               //    name: 'Other',
               //    y: 2.6
               // }],
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


      this.chartOptions4 = {
         title: {
            text: 'Likes, Dislikes and Comments over 12 Months' + ' of ' + new Date().getFullYear(),
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
               data: this.dataChartByMonth.map((item: any) => {
                  if(item[0] == null || item[0] === undefined || item[0] === ''){
                     return 0;
                  }
                  else {
                     
                  return item[0].totalLike;
                  }
               }),
            },
            {
               name: 'Dislikes',
               data: this.dataChartByMonth.map((item: any) => {
                  if(item[0] == null || item[0] === undefined || item[0] === ''){
                     return 0;
                  }
                  else {
                     
                  return item[0].totalDislike;
                  }
               }),
            },
            {
               name: 'Comments',
               data: this.dataChartByMonth.map((item: any) => {
                  if(item[0] == null || item[0] === undefined || item[0] === ''){
                     return 0;
                  }
                  else {
                     
                  return item[0].totalComment;
                  }
               }),
            },
         ],
      }
      
      
        
         
      }, (err: any) => {
         this.toast.error({detail: "Get dashboard failed!", position: "top-right",duration: 3000});
         console.log(err);
      }
      )

     

      

   }
   
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

   // chartOptions2: Highcharts.Options = {};


   chartOptions2!: any


   chartOptions3!: any 



   chartOptions4!: any



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