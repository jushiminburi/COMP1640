import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-staff-home-page',
  templateUrl: './staff-home-page.component.html',
  styleUrls: ['./staff-home-page.component.css']
})
export class StaffHomePageComponent implements OnInit {
  // ngListEvent = [ "All Event", "Category 1", "Department1","All Idea"];
  // ngListCategory = [ "All Category", "Category 1", "Category 2","Category3"];
  // ngListDepartment = [ "All Department", "Department 1", "Department 2","Department3"];
  // ngFilterIdea =[ "All Idea", "Most Popular Idea", "Most Viewed Idea","Least Idea"];


  ngListEvent: any[] = [];
  ngListCategory: any[] = [];
  ngListDepartment: any[] = [];
  
  ngFilterIdea: any =[
    {id: "0", name: "All Idea"},
    {id: "most_total_views", name: "Most Total Views"},
    {id: "latest_comments", name: "Latest comments"},
    {id: "popular_idea", name: "Most Popular Idea"},
    {id: "latest_idea", name: "Latest Idea"},
  ];

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

  ideas: any[] = [];
  comments?: any[] = [];
  totalComments?: number;

  createAccountForm!: FormGroup;

  constructor(private api: ApiService, private router: Router,
    private route: ActivatedRoute, private http: HttpClient,
    private fb: FormBuilder, private toast: NgToastService) { }

    categorySelected!: any;
    eventSelected!: any;
    departmentSelected!: any;

    ngFilterSelected!: any;

    onDropdownEvent(selectedValue: any) {
      this.eventSelected = selectedValue.target.value;
      this.getListIdea();
    }
  
    onDropdownCategory(selectedValue: any) {
      this.categorySelected = selectedValue.target.value;
      this.getListIdea();
    }
  
    onDropdownDepartment(selectedValue: any) {
      this.departmentSelected = selectedValue.target.value;
      this.getListIdea();
    }

    onDropdownFilter(selectedValue: any) {
      this.ngFilterSelected = selectedValue.target.value;
      this.getListIdea();
    }

  

    getListDepartment() {
    this.api.getListDepartment().subscribe((res: any) => {
      this.ngListDepartment = res.data.list
      this.ngListDepartment.push({id: 0, name: "All Department"})
    })
  }


  getListCategory() {
    this.api.getListCategory().subscribe((res: any) => {
      this.ngListCategory = res.data.list
      this.ngListCategory.push({id: 0, name: "All Category"})
    })
  }


  getListEvent() {
    this.api.getEvents().subscribe((res: any) => {
      this.ngListEvent = res.data.list
      this.ngListEvent.push({id: 0, name: "All Event"})
    })
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
  


  getListIdea() {

    let params= {
      eventId: this.eventSelected,
      categoryId: this.categorySelected,
      departmentId: this.departmentSelected,
      sort: this.ngFilterSelected

    }
    
    
    const helper = new JwtHelperService();
    const data = helper.decodeToken(localStorage.getItem('accessToken')|| '{}');
    console.log(localStorage.getItem('accessToken'));
    
    console.log(data);

    
    
    this.api.getIdeas(this.currentPage, this.limit, params).subscribe((d: any) => {
      var data = JSON.parse(d);
      console.log(data);
      var category = ""
     
      if (data.status == 200) {
        this.ideas = data.data.listIdea;
        
        this.ideas?.forEach((idea: any) => {

          //get user name
          this.api.getUserById(idea.user.userId).subscribe((d: any) => {
            idea.userName = d.data.firstName + " " + d.data.lastName
            idea.avatarUser = d.data.avatar
            console.log(d);
            return
          }, err => {
            console.log(err);
            idea.userName = ""
            return
          })
          
          // get event name
          this.api.getEventById(idea.event.id).subscribe((res: any) => {
            idea.eventName = res.data.name
            console.log(idea.eventName);
            return
          },
          error => {
            console.log(error);
            idea.eventName = ""
            return
          })
          
          //add category name
          this.api.getCategory().subscribe((res: any) => {
            //get name category
            var d = res.data.list
            console.log(d);
            d.forEach((c: any) => {
              
              if (c.id == idea.categoryId) {
                //add category name to ideas
                idea.categoryName = c.name
                console.log(idea.categoryName);
              }
            })
          })
          
        })
        
        this.totalPages = Math.ceil(data.data.totalIdea / this.limit);
        this.pageArray = Array(this.totalPages).fill(undefined).map((x, i) => i+1)

        
        
        // this.totalItems = data.data.totalItems;
        // this.totalPages = data.data.totalPages;
        // this.pageArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
        // console.log(this.pageArray);

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


  changePage(i: number): void {
    // const element = document.getElementById('paginator');
    // element!.classList.add('active');


    this.currentPage = i
    this.getListIdea();
  }


  nextPage() {
    this.currentPage++;
    this.getListIdea();
  }

  previousPage() {
    this.currentPage--;
    this.getListIdea();
  }



  ngOnInit() {
    this.getListDepartment();
    this.getListCategory();
    this.getListEvent();
    
    // this.getAnUser();
    this.getListIdea();
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


