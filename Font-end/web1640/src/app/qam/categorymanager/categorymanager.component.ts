import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/api.service';
interface Category {
  id: number,
  name: string,
  createdAt: string,
  updatedAt: string

}
@Component({

  templateUrl: './categorymanager.component.html',
  styleUrls: ['./categorymanager.component.css']
})


export class CategorymanagerComponent implements OnInit {
  status: any;
  categoryForm!: FormGroup;

  categories: Category[] = [];


  isShowForm = false;

  getlistCategory() {
    this.api.getCategory().subscribe((res: any) => {
      const data = JSON.parse(res);
      this.categories = data.data;
    })


  }

  deleteCategory(id: number) {
    if (confirm("Are you sure to delete this category?")) {
      this.api.deleteCategory(id).subscribe(async (res: any) => {

        if (res.status == 200) {
          // await this.getlistCategory();
          this.router.navigateByUrl('/qam', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/qam/categorymanager']).then(() => {

              this.toast.success({ detail: "Delete Category Success!", duration: 3000, position: "top-right" })
            })
          })

        }

      }, (err: any) => {
        alert("Delete category failed!");
        console.log(err);
        // location.reload();


      }
      )


    }

  }


  addCategory() {


    if (confirm("Are you sure to add this category?")) {
      
      
      this.api.addCategory(this.categoryForm.value.name).subscribe(async (res: any) => {
        if (res.status == 200) {
          this.router.navigateByUrl('/qam', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/qam/categorymanager']).then(() => {

              this.toast.success({ detail: "Add Category Success!", duration: 3000, position: "top-right" })
            })
          })



        }

      }, (err: any) => {
        alert("Add category failed!");
        console.log(err);
        location.reload();


      }
      )




    }



  }







  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog, private toast: NgToastService) {

    this.categoryForm = this.fb.group({

      name: new FormControl('', [Validators.required]),
      createdAt: new FormControl(null),
      updatedAt: new FormControl(null)
    })

  } //dependency injection



  // createAccountForm = new FormGroup({

  //   firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),

  //   email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(9)]),
  //   password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  //   role: new FormControl('', [Validators.required]),
  //   department: new FormControl('', [Validators.required]),
  //   avatar: new FormControl(File)
  //  })



  ngOnInit(): void {
    // this.newAccount();
    this.getlistCategory();

  }

}

