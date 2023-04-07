import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css']
})
export class ListCommentComponent {
  @Input() comments!: any[];
  @Input() postId!: number;

  @Output() commentEvent = new EventEmitter<string>();


  ngOnInit(): void {
    // this.getCommentsByPostId();
    console.log(this.postId);

    const helper = new JwtHelperService();
    const user = helper.decodeToken(localStorage.getItem('accessToken')|| '{}');
  //  for (let i = 0; i < this.comments.length; i++) {
  //    if (this.comments[i].user.id == user.id) {
  //       this.comments[i].action = true;
  //    }
  //  }

  }

  likeComment(id: any) {
    this.api.likeComment(id).subscribe(async (res: any) => {
      if (res.status == 200) {
        this.commentEvent.emit('like');
      }
    }, (err: any) => {
      
      console.log(err);
      // location.reload();
    })

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


  checkUpdateDeleteOptions(id: any) {
    const helper = new JwtHelperService();
    const data = helper.decodeToken(localStorage.getItem('accessToken')|| '{}');
    console.log(data);
    if (id == data.id) {
      return true;
    }
    return false;
  }

  


  deleteComment() {
    


    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteComment(this.categoryForm.value.name).subscribe(async (res: any) => {
          if (res.status == 200) {
            this.router.navigateByUrl('/staff', { skipLocationChange: true }).then(() => {
              this.router.navigateByUrl(this.router.url).then(() => {
                this.toast.success({ detail: "Delete Comment Success!", duration: 3000, position: "top-right" })
              })
            })
          }
        }, (err: any) => {
          this.toast.error({ detail: "Delete comment failed!", duration: 3000, position: "top-right" })
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
