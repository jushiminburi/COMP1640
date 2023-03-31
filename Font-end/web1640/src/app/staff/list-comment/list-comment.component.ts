import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css']
})
export class ListCommentComponent {
  @Input() comments?: any[] = [];
  @Input() postId!: number;

  ngOnInit(): void {
    // this.getCommentsByPostId();
    console.log(this.postId);
  }

  // getCommentsByPostId() {
  //   this.api.getComment(this.postId).subscribe((res: any) => {
  //     console.log(res.data.listComment);
  //     this.comments = res.data.listComment;
  //     console.log(this.comments)
  //   })

  // }

  status: any;
  categoryForm!: FormGroup;

  // categories: Category[] = [];

  categories: any[] = [];


  isShowForm = false;

  getlistCategory() {
    this.api.getCategory().subscribe((res: any) => {
      
     console.log(res.data.list);
     this.categories = res.data.list
    })


  }

  deleteCategory(id: number) {
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
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
          this.toast.error({ detail: "Delete category failed!", duration: 3000, position: "top-right" })
          console.log(err);
          // location.reload();
    
    
        }
        )
        
      } 
      // else if (result.dismiss === Swal.DismissReason.cancel) {
      //   Swal.fire(
      //     'Cancelled',
      //     'Your imaginary file is safe :)',
      //     'error'
      //   )
      // }
    })
    // if (confirm("Are you sure to delete this category?")) {
    //   this.api.deleteCategory(id).subscribe(async (res: any) => {

    //     if (res.status == 200) {
    //       // await this.getlistCategory();
    //       this.router.navigateByUrl('/qam', { skipLocationChange: true }).then(() => {
    //         this.router.navigate(['/qam/categorymanager']).then(() => {

    //           this.toast.success({ detail: "Delete Category Success!", duration: 3000, position: "top-right" })
    //         })
    //       })

    //     }

    //   }, (err: any) => {
    //     alert("Delete category failed!");
    //     console.log(err);
    //     // location.reload();


    //   }
    //   )


    // }

  }


  addCategory() {
    


    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.addCategory(this.categoryForm.value.name).subscribe(async (res: any) => {
          if (res.status == 200) {
            this.router.navigateByUrl('/qam', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/qam/categorymanager']).then(() => {
                this.toast.success({ detail: "Add Category Success!", duration: 3000, position: "top-right" })
              })
            })
          }
        }, (err: any) => {
          this.toast.error({ detail: "Add category failed!", duration: 3000, position: "top-right" })
          console.log(err);
          // location.reload();
        }
        )
      }
    })

    // this.categoryForm.reset();


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
    }, {Validators: false})

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



  



}
