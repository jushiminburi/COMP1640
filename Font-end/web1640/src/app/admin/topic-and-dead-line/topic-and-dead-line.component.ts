import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

interface NewDeadline {

  Topic: string | null,
  DLTopic: Date | null,
  DLComment: Date | null,
  Description: string | null,

}
@Component({

  templateUrl: './topic-and-dead-line.component.html',
  styleUrls: ['./topic-and-dead-line.component.css']
})


export class TopicAndDeadLineComponent {
  ngOptionTopic = ["", "Topic 1", "Topic 2", "Topic 3", "Topic 4",]

  newDeadline: NewDeadline = {
    Topic: null,
    DLTopic: null,
    DLComment: null,
    Description: null,



  };

  deadlineForm = new FormGroup({
    Topic: new FormControl('', [Validators.required]),
    DLTopic: new FormControl('', [Validators.required]),
    DLComment: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required]),
  })

  
  
  DeadlineForm = new FormGroup({
    Topic: new FormControl(''),
    DLTopic: new FormControl(''),
    DLComment: new FormControl(''),
    Description: new FormControl(''),

  })

  createDeadline = new FormGroup({
    Topic: new FormControl(''),
    DLTopic: new FormControl(''),
    DLComment: new FormControl(''),
    Description: new FormControl(''),
    
  }
  )
  CreateDeadline(data: any) {
    //get password from localstorage
    var deadline: any = localStorage.getItem('deadline');
    var topic = JSON.parse(deadline).Topic;;
    // console.log("dsadsds" + phone);

    this.deadline = {
      Topic: data.Topic,
      DLTopic: data.DLTopic,
      DLComment: data.DLComment,
      Description: data.Description,
    }

    console.log("hii");
    // this.api.CreateDeadline(this.deadline
    // ).subscribe(res => {

    //   var d = JSON.parse(res); //doi tu json sang object
    //   const helper = new JwtHelperService();
    //   console.log("okeee", d.deadline)
    //   const decoedToken = helper.decodeToken(d.deadline);
    //   console.log("okeee", d.deadline)
    //   console.log("d", decoedToken);

    //   alert("Tạo tài khoản thành công!");

    //   // this.router.navigateByUrl('/students/profilestudent');
    //   this.router.navigateByUrl('/admin');
    // },

    //   error => {
    //     console.log("Error", error);
    //     alert("Error");
    //     this.router.navigateByUrl('/admin/TopicandDeadline');
    //   }

    // );


  }
  deadline: NewDeadline = {
  
    Topic: null,
    DLTopic: null,
    DLComment: null,
    Description: null,


  };

  status: any;
  categoryForm!: FormGroup;

  categories: any[] = [];


  isShowForm = false;
  
  getlistCategory() {
    this.api.getCategory().subscribe((res: any) => {
      const data = JSON.parse(res);
      this.categories = data.data;
      
      
    })


  }

  deleteCategory(id: number) {
    if(confirm("Are you sure to delete this category?")){ 
      this.api.deleteCategory(id).subscribe(async (res: any) => {
       
        if (res.status == 200) {
          // await this.getlistCategory();
          await location.reload();
          alert("Delete category successfully!");
          
        }
        
      },(err: any) => {
        alert("Delete category failed!");
        location.reload();
        

      }
      )

    
    }
   
  }


  addCategory(data: any) {

    if (this.categoryForm.invalid) {
      alert("Please fill all fields!");
      return;

    
    } else {
      const name = data.value.name;
      this.api.addCategory(name).subscribe(async (res: any) => {
        if (res.status == 200) {
          await location.reload();
          alert("Add category successfully!");
          
        }
        
      }, (err: any) => {
        alert("Add category failed!");
        location.reload();
        

      }
      )

    }
   


  }

  eventForm = new FormGroup({
    name: new FormControl('', Validators.required),
    deadlineIdea: new FormControl('', Validators.required),
    deadlineComment: new FormControl('', Validators.required),
  });

  addEvent() {
    const deadlineIdea = this.datePipe.transform(this.eventForm.value.deadlineComment, 'yyyy-MM-dd');
    const deadlineComment = this.datePipe.transform(this.eventForm.value.deadlineComment, 'yyyy-MM-dd');
    const data = {
      name: this.eventForm.value.name,
     
      deadlineIdea: deadlineIdea,
      deadlineComment: deadlineComment

    };
    this.api.addEvent(data).subscribe((response) => {

      const data = JSON.parse(response);
      if (data.status == 200) {
        alert("Add event successfully!");
        location.reload();
      } else {
        alert("Add event failed!");
      }

    },
      (err: any) => {
        alert("Add event failed!");
      })
  }

  events: any[] = [];


  getAnEvent() {
    
    
    this.api.getEvents().subscribe((response) => {
      const data = JSON.parse(response);
      if(data.status == 200){
        
        this.events = data.data;
       
      } else {
        alert("Get events failed!");
      }
      
      
      
      
    }, (err: any) => {
      alert("Get events failed!");
    })
  }


  // editEvent() {
  //   const deadlineIdea = this.datePipe.transform(this.eventForm.value.deadlineComment, 'yyyy-MM-dd');
  //   const deadlineComment = this.datePipe.transform(this.eventForm.value.deadlineComment, 'yyyy-MM-dd');
  //   const formData = {
  //     name: this.eventForm.value.name,
     
  //     deadlineIdea: deadlineIdea,
  //     deadlineComment: deadlineComment

  //   };
  //   this.api.submitRegistrationForm(formData).subscribe((response) => {
  //     console.log(response);
  //   });
  // }



  







  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog, private datePipe: DatePipe) {

      this.categoryForm = this.fb.group({
        id: new FormControl(null),
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
    this.getAnEvent();

  }

  // CreateNewAccount(data: any) {
  //   //get password from localstorage

  //   var formData: any = new FormData();

  //   for (let key in this.createAccountForm.value) {
  //     console.log(key);
  //     formData.append(key, this.createAccountForm.get(key)!.value);
  //   }



  //   // formData.append('firstName', this.createAccountForm.get('firstName')!.value?.toString());
  //   // formData.append('lastName', this.createAccountForm.get('lastName')!.value);
  //   // formData.append('username', this.createAccountForm.get('username')!.value);
  //   // formData.append('email', this.createAccountForm.get('email')!.value);
  //   // formData.append('role', this.createAccountForm.get('role')!.value);
  //   // formData.append('password', this.createAccountForm.get('password')!.value);
  //   // formData.append('department', this.createAccountForm.get('department')!.value);



  //   // this. = {

  //   //   firstName: data.firstName,
  //   //   lastName: data.lastName,
  //   //   username: data.username,
  //   //   email: data.email,
  //   //   password: data.password,
  //   //   role: data.role,
  //   //   department: data.department,

  //   // }





  //   // if(this.loginForm.invalid){
  //   //     return false;
  //   // } 
  //   // truyen du lieu vao form
  //   // console.log(data.email, data.password);
  //   // this.router.navigateByUrl('/students');

  //   // return true;
  //   // console.log(
  //   //  this.resetpasswordForm.value);
  //   // if (this.resetpasswordForm.value.oldpassword != oldPw) {

  //   //   alert("Mật khẩu cũ không đúng");
  //   //   return false;
  //   // }
  //   // else if (this.resetpasswordForm.value.newpassword != this.resetpasswordForm.value.reNewpassword) {
  //   //   alert("Mật khẩu mới không trùng khớp");
  //   //   return false;
  //   // }
  //   // else {
  //   // console.log("hii");

  //   // var formData = new FormData();
  //   // formData.append('image', this.createAccountForm.controls.image.value!);
  //   // formData.append('firstName', this.createAccountForm.controls.firstName.value!);
  //   // formData.append('lastName', this.createAccountForm.controls.lastName.value!);
  //   // formData.append('username', this.createAccountForm.controls.username.value!);
  //   // formData.append('email', this.createAccountForm.controls.email.value!);
  //   // formData.append('role', this.createAccountForm.controls.role.value!);
  //   // formData.append('password', this.createAccountForm.controls.password.value!);
  //   // formData.append('department', this.createAccountForm.controls.department.value!);


  //   // formData.append('firstName', this.myForm?.get('firstName')?.value);
  //   // formData.append('', this.myForm?.get('')?.value);
  //   // formData.append('username', this.myForm?.get('username')?.value);
  //   // formData.append('email', this.myForm?.get('email')?.value);
  //   // formData.append('role', this.myForm?.get('role')?.value);
  //   // formData.append('password', this.myForm?.get('password')?.value);
  //   // formData.append('department', this.myForm?.get('Department')?.value);

  //   console.log(formData);

  //   this.api.createNewAccount(formData
  //   ).subscribe(res => {

  //     // alert("Login Successful!");
  //     var data = JSON.parse(res)

  //     console.log(res);
  //     console.log(data.data.username);

  //     if (data.status == 200) {


  //       const dialogRef = this.dialog.open(SuccessDialogComponentComponent, {
  //         data: {
  //           username: data.data.username,
  //           email: data.data.email,
  //           password: this.createAccountForm?.get('password')?.value,
  //         },
  //       });

  //       dialogRef.afterClosed().subscribe(() => {
  //         // Xử lý sau khi dialog đóng lại (nếu cần)
  //       });
  //       this.createAccountForm.reset();

  //       this.router.navigate(['/admin/createaccount'])

  //       // this.router.navigate(['/admin'])
  //     } else if (data.status == 400) {
  //       alert("Create Account Failed!")
  //     }
  //     // else if (user.role == 4) {
  //     //   this.router.navigateByUrl('/staff');
  //     // }






  //     // luu lai trang trc roi quay lai trang do, sau do xoa di
  //     // this.router.navigateByUrl('/students');
  //     // localStorage.setItem('token', res.result);
  //   },

  //     error => {
  //       alert("Create Account Failed!")

  //       console.log(error)
  //       // this.router.navigate(['/login']);
  //     }

  //   );


  // }


  


}








