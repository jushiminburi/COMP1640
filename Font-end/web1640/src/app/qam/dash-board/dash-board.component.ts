import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Chart} from 'chart.js';
import { NgToastService } from 'ng-angular-popup';
import { SuccessDialogComponentComponent } from 'src/app/admin/create-account/success-dialog-component/success-dialog-component.component';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';



window.Chart = Chart

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

@Component({
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
  PieChart = [];
  BarChart = [];

  totalIdeas: any;
  totalComments: any;
  totalUsers: any;
  totalCategory: any
  totalDepartment: any;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  // public pieChartLabels: Label[] = ['Category A', 'Category B', 'Category C'];
  public pieChartData: ChartDataSets[] = [
    { data: [300, 450, 200], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }
  ];
  public pieChartType: ChartType = 'pie';


  getTotalIdeas(): any {
    this.api.getIdeas().subscribe((d: any) => {
      console.log(d);

      var data = JSON.parse(d);
      if (data.status == 200) {
        this.totalIdeas = data.data.totalIdea;
        console.log(this.totalIdeas);
      } else {
        alert("Get total ideas failed!");
        console.log(data.message);
        return
      }

    }, error => {
      alert("Get total ideas error!");
      console.log(error);
      return
    }
    )
  }

  getTotalUsers(): any {
    this.api.getUsers().subscribe((d: any) => {
      console.log(d);
      if (d.status == 200) {
        this.totalUsers = d.data.totalUser;
        console.log(this.totalUsers);
      } else {
        alert("Get total users failed!");
      }})
  }


  getTotalCategory(): any {
    this.api.getCategory().subscribe((d: any) => {
      var data = JSON.parse(d);
      console.log(data);
      if (data.status == 200) {
        this.totalCategory = data.data.totalCategory;
        console.log(this.totalCategory);
      } else {
        alert("Get total category failed!");
      }})
  }

  getTotalDepartment(): any {
    this.api.getDepartment().subscribe((d: any) => {
      var data = JSON.parse(d);
      console.log(data);
      
        this.totalDepartment = data.data.totalDepartment;
        console.log(this.totalDepartment);
     })
  }

  

  createAccountForm!: FormGroup;

  constructor(private api: ApiService, private router: Router,
    private route: ActivatedRoute, private http: HttpClient,
    private dialog: MatDialog, private fb: FormBuilder, private toast: NgToastService, private modalService: NgbModal) { }

  ngDepartment = ["IT", "HR", "Marketing", "Sales", "Finance", "Admin"];
  ngOptionrole = ["Admin", "QMA", "ABC", "Staff"];
  public aElement?: boolean = true;


  onclick() {
    this.aElement = !this.aElement;


  }
  currentFile?: File;

  selectFile(event: any, fieldName: string): void {

    this.currentFile = event.target.files[0];
    this.createAccountForm.get('avatar')?.setValue(this.currentFile);




  }

  

  getAnUser(id: number) {
    console.log(id);
    this.api.getUsers().subscribe((d: any) => {
      var data = JSON.parse(d);
      console.log(data);
      if (data.status == 200) {
        //filter user by id

        let user = data.data.listUser.filter((user: any) => user.userId == id)[0];
        console.log(user);
        //set value for formcontrol
        console.log(this.editAccountForm.value);
        for (let key in this.editAccountForm.value) {
          if (key == "avatar") continue;
          this.editAccountForm.get(key)?.setValue(user[key]);
        }

        console.log(this.editAccountForm.value);

      } else {
        alert("Get user failed!");
        console.log(data.message);
        return
      }

    }, error => {
      alert("Get user error!");
      console.log(error);
      return
    }
    )

  }


  editUser(id: any) {
    if (confirm("Are you sure to edit this account?")) {
      console.log(this.editAccountForm.get('userId')?.value);

      var formData: any = new FormData();
      for (let key in this.editAccountForm.value) {
        console.log(key);
        formData.append(key, this.editAccountForm.get(key)!.value);
      }
      console.log(formData);

      this.api.editUser(id, formData
      ).subscribe(async (res: any) => {
        var data = JSON.parse(res);

        if (data.status == 200) {

          // Reload current page
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/admin/accountmanager']).then(() => {
              this.modalService.dismissAll();
              Swal.fire("Account edited successfully!", "", "success");
              // this.toast.success({ detail: "Edit Account Success!", duration: 3000, position: "top-right" })


            })
          })


          // this.router.navigate(['/admin'])
        } else if (data.status == 400) {
          this.toast.warning({ detail: "Edit Account Failed!", duration: 3000, position: "top-right" })
          alert("Edit Account Failed!")

        }

      },

        error => {
          this.toast.error({ detail: "Edit Account Failed!", duration: 3000, position: "top-right" })
          console.log(error)

        });


    }




  }

  // loadStudents(): void {
  //   this.api.getUsers(this.currentPage, this.limit).subscribe(
  //     res => {
  //       console.log(res);
  //       var users = JSON.parse(res);
        
  //       this.users = users.data.listUser;
  //       //change avater url
  //       this.users.forEach((user: any) => {
  //         //change localhost to ip
  //         user.avatar = user.avatar.replace("localhost:8888", "139.162.47.239");
  //       })
  //       console.log(users);
  //       this.totalPages = Math.ceil(users.data.totalUser / this.limit);
  //       this.pageArray = Array(this.totalPages).fill(undefined).map((x, i) => i+1)
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }



  editAccountForm = new FormGroup({
    userId: new FormControl(0),
    avatar: new FormControl(null),
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),

    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(9)]),

    role: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required])
  })

  delete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteUser(id).subscribe((data: any) => {
          // Swal.fire(
          //   'Deleted!',
          //   'Your file has been deleted.',
          //   'success'
          // )
          this.toast.success({ detail: "Delete Account Success!", duration: 3000, position: "top-right" })
          // this.loadStudents();
        },

          error => {
            Swal.fire(
              'Failed!',
              'Delete failed.',
              'error'
            )
          }
        )
      }
    })
  }

    // if (confirm("Are you sure you want to delete this account?")) {
    //   this.api.deleteUser(id).subscribe((data: any) => {
    //     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    //       this.router.navigate(['/admin/accountmanager']).then(() => {
    //         this.modalService.dismissAll();
    //         this.toast.success({ detail: "Edit Account Success!", duration: 3000, position: "top-right" })
    //       })
    //     })



    //   },
    //     error => {
    //       alert("Delete Failed!")
    //     }

    //   );
    // }

  // }


ngOnInit() {
  this.getTotalCategory();
  this.getTotalIdeas();
  this.getTotalUsers();
  this.getTotalDepartment();
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

  const columnChart = new Chart('columnChart', {
    type: 'bar',
    data: {
      labels: ['IT', 'Business', 'Marketing', 'HR'],
      datasets: [
        {
          label: 'Teaching',
          data: [10, 5, 8, 3],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Activity',
          data: [8, 7, 6, 2],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          label: 'Facility',
          data: [4, 3, 2, 1],
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderColor: 'rgba(255, 206, 86, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Number of ideas by department and category'
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
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
