import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiService } from 'src/app/api.service';
import { EachIdeaComponent } from 'src/app/staff/each-idea/each-idea.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-most-popular-idea',
  templateUrl: './most-popular-idea.component.html',
  styleUrls: ['./most-popular-idea.component.css']
})
export class MostPopularIdeaComponent {

  currentPage: number = 1;
  totalPages: number = 0;
  pageArray: number[] = [];
  limit: number = 5;

  postId!: number;

  onClick(id:any) {
    this.postId = id
  }


 
  totalItems?: number; // Total number of users

  page?: number;

  
  comments?: any[] = [];
  totalComments?: number;

  createAccountForm!: FormGroup;

  constructor(
    
    private api: ApiService, private router: Router,
    private route: ActivatedRoute, private http: HttpClient,
    private fb: FormBuilder, private toast: NgToastService) { }

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

  getComment(ideaId: number) {
    this.api.getComment(ideaId).subscribe((res: any) => {
      this.comments = res.data.listComment;
    })
  }

  dislike(id: any) {
    this.api.dislikeIdea(id).subscribe(async (res: any) => {
      console.log(res);
      if (res.status == 200) {
        
       
        
      }
    }, error => {
      this.toast.error({ detail: "Like idea failed!" });
      console.log(error);
      return
    }
    )
  }

  

  

 
  getAnUser() {
    
    const helper = new JwtHelperService();
    const data = helper.decodeToken(localStorage.getItem('accessToken')|| '{}');
    console.log(data);
    
    this.api.getUsers().subscribe((d: any) => {
      var data = JSON.parse(d);
      console.log(data);
      if (data.status == 200) {
        //filter user by id

        let user = data.data.listUser.filter((user: any) => user.userId == data.id)[0];
        console.log(user.avatar);
        //set value for formcontrol
        

      }

    }, error => {
      this.toast.error({ detail: "Get user failed!" });
      console.log(error);
      return
    }
    )

  }

  //get category name
  getCategoryName() {
    this.api.getCategory().subscribe((res: any) => {
      //get name category
      var d = res.data.list
      console.log(d);
      d.forEach((c: any) => {
        console.log(c);
        if (c.id == this.createAccountForm.value.categoryId) {
          this.createAccountForm.value.categoryName = c.name
        }
      })
    })
  }

  // getEventById(id: any) {
  //   this.api.getEventById(id).subscribe((res: any) => {
  //     console.log(res.data.name);

  //     return res.data.name
      
  //   }, error => {
     
  //     console.log(error);
  //     return ""})
  // }
  

  ideas!: any[];
  ref!: DynamicDialogRef;
  getTotalUser() {
    this.api.getUsers().subscribe((res: any) => {
      var data = JSON.parse(res);
      if (data.status == 200) {
        this.totalItems = res.data.totalUser;
      } else {
        this.toast.error({ detail: "Get user failed!" });
        console.log(data.message);
        return
      }
     
    }, error => {
      this.toast.error({ detail: "Get user failed!" });
      console.log(error);
      return
    })
   }
  getListPopularIdea() {
    
    this.api.getIdeas(this.currentPage, this.limit, {sort: "popular_idea"}).subscribe((d: any) => {
      var data = JSON.parse(d);
      console.log(data);
      var category = ""
     
      if (data.status == 200) {
        this.ideas = data.data.listIdea;
         
        
        this.totalPages = Math.ceil(data.data.totalIdea / this.limit);
        this.pageArray = Array(this.totalPages).fill(undefined).map((x, i) => i+1)

      } else {
        this.toast.error({ detail: "Get idea failed!" });
        console.log(data.message);
        return
      }

    }, error => {
      this.toast.error({ detail: "Get idea failed!" });
      console.log(error);
      return
    }
    )

  }

  loadStudents(): void {
    this.api.getUsers(this.currentPage, this.limit).subscribe(
      res => {
        console.log(res);
        var users = JSON.parse(res);
        
        // this.users = users.data.listUser;
        // //change avater url
        // this.users.forEach((user: any) => {
        //   //change localhost to ip
        //   user.avatar = user.avatar.replace("localhost:8888", "139.162.47.239");
        // })
        console.log(users);
        this.totalPages = Math.ceil(users.data.totalUser / this.limit);
        console.log(this.totalPages);
        this.pageArray = Array(this.totalPages).fill(undefined).map((x, i) => i+1)
      },
      error => {
        console.log(error);
      }
    );
  }



  ngOnInit() {
    this.getListPopularIdea();
    this.getTotalUser();
    
    // this.getAnUser();
    // this.getListIdea();
    this.createAccountForm = this.fb.group({
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      role: null,
      department: null,
      avatar: null
    })

    // this.loadStudents();

    // this.route.queryParams.subscribe(params => {
    //   this.page = +params['page'] || 1;
    //   this.limit = +params['limit'] || 5;
    //   //Lấy danh sách tài khoản từ API
    //   this.api.getUsers(this.page, this.limit).subscribe((data: any) => {
    //     console.log(data)
    //     var d = JSON.parse(data);
    //     this.accounts = d.data.listUser;

    //     console.log()
    //   },
    //   error => {
    //     console.log(error);
    //   }

    //   );
    // });

  }


    

    

}
