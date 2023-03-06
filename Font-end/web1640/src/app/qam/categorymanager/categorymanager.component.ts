import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
interface LoginDetails {
  Newtopic: string | null,

}
@Component({
  
  templateUrl: './categorymanager.component.html',
  styleUrls: ['./categorymanager.component.css']
})


export class CategorymanagerComponent implements OnInit {
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







  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog) {

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
    this.getlistCategory();

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


  reloadParent() {
    this.ngOnInit();
  }

}

