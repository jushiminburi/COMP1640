import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponentComponent } from './success-dialog-component/success-dialog-component.component';
import { NgToastModule, NgToastService } from 'ng-angular-popup';




@Component({
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  currentFile!: File;
  ngDepartment = ["IT", "HR", "Marketing", "Sales", "Finance", "Admin"];
  ngOptionrole = ["Admin", "QAM", "QAC", "Staff"];
  public aElement?: boolean = true;

  



 
  onclick() {
    this.aElement = !this.aElement;
    
   
  }

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog, private toastService: NgToastService) {

  } //dependency injection

  createAccountForm   !: FormGroup;

  // createAccountForm = new FormGroup({
   
  //   firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    
  //   email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(9)]),
  //   password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  //   role: new FormControl('', [Validators.required]),
  //   department: new FormControl('', [Validators.required]),
  //   avatar: new FormControl(File)
  //  })

  categories?: any[] = []


  getCategories() {
    this.api.getCategory().subscribe((data: any) => {
      console.log(data);
      this.categories = data.data.list
      
    }, error => {
      console.log(error);
    })

    
  }


  

  ngOnInit(): void {
    // this.newAccount();
    this.getCategories();

    this.createAccountForm = this.fb.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      files: new FormControl('')
    })
    
  }


  selectFile(event: any, fieldName: string): void {

    this.currentFile = event.target.files[0];
   
    this.createAccountForm.get(fieldName)?.setValue(this.currentFile);
    
    // console.log(this.createAccountForm);

   
  }

  
  // createAccountForm = new FormGroup({
  //   image: new FormControl(''),
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   username: new FormControl(''),
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  //   role: new FormControl(''),
  //   department: new FormControl(''),
  // }
  // )
 

  CreateNewAccount(data: any) {
    //get password from localstorage
    
    var formData: any = new FormData();

    for(let key in this.createAccountForm.value){
      console.log(key);
      //if avatar == null or undefined => not append
      
      if(this.createAccountForm.get(key)!.value){
        formData.append(key, this.createAccountForm.get(key)!.value);
      }
      
    }

    
    
    // formData.append('firstName', this.createAccountForm.get('firstName')!.value?.toString());
    // formData.append('lastName', this.createAccountForm.get('lastName')!.value);
    // formData.append('username', this.createAccountForm.get('username')!.value);
    // formData.append('email', this.createAccountForm.get('email')!.value);
    // formData.append('role', this.createAccountForm.get('role')!.value);
    // formData.append('password', this.createAccountForm.get('password')!.value);
    // formData.append('department', this.createAccountForm.get('department')!.value);


    
    // this. = {
      
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   username: data.username,
    //   email: data.email,
    //   password: data.password,
    //   role: data.role,
    //   department: data.department,
      
    // }





    // if(this.loginForm.invalid){
    //     return false;
    // } 
    // truyen du lieu vao form
    // console.log(data.email, data.password);
    // this.router.navigateByUrl('/students');

    // return true;
    // console.log(
    //  this.resetpasswordForm.value);
    // if (this.resetpasswordForm.value.oldpassword != oldPw) {

    //   alert("Mật khẩu cũ không đúng");
    //   return false;
    // }
    // else if (this.resetpasswordForm.value.newpassword != this.resetpasswordForm.value.reNewpassword) {
    //   alert("Mật khẩu mới không trùng khớp");
    //   return false;
    // }
    // else {
    // console.log("hii");

    // var formData = new FormData();
    // formData.append('image', this.createAccountForm.controls.image.value!);
    // formData.append('firstName', this.createAccountForm.controls.firstName.value!);
    // formData.append('lastName', this.createAccountForm.controls.lastName.value!);
    // formData.append('username', this.createAccountForm.controls.username.value!);
    // formData.append('email', this.createAccountForm.controls.email.value!);
    // formData.append('role', this.createAccountForm.controls.role.value!);
    // formData.append('password', this.createAccountForm.controls.password.value!);
    // formData.append('department', this.createAccountForm.controls.department.value!);

    
    // formData.append('firstName', this.myForm?.get('firstName')?.value);
    // formData.append('', this.myForm?.get('')?.value);
    // formData.append('username', this.myForm?.get('username')?.value);
    // formData.append('email', this.myForm?.get('email')?.value);
    // formData.append('role', this.myForm?.get('role')?.value);
    // formData.append('password', this.myForm?.get('password')?.value);
    // formData.append('department', this.myForm?.get('Department')?.value);

    console.log(formData.get('lastName'));
    console.log(formData.get('firstName'));
    console.log(formData.get('email'));
    console.log(formData.get('password'));
    console.log(formData.get('role'));
    console.log(formData.get('department'));
    console.log(formData.get('files'));
    this.api.createNewAccount( formData
    ).subscribe(res => {

      // alert("Login Successful!");
        var data = JSON.parse(res)

        console.log(res);
        console.log(data.data.username);

        if (data.status == 200) {
          
         
          // const dialogRef = this.dialog.open(SuccessDialogComponentComponent, {
          //   data: {
          //     username: data.data.username,
          //     email: data.data.email,
          //     password: this.createAccountForm?.get('password')?.value,
          //   },
          // });
          
        
          // dialogRef.afterClosed().subscribe(() => {
          //   // Xử lý sau khi dialog đóng lại (nếu cần)
          // });

          this.toastService.success({detail: 'Create Account Successful!', summary: 'Success', duration: 3000})
          this.createAccountForm.reset();
          
          this.router.navigate(['/admin/createaccount'])
        
          // this.router.navigate(['/admin'])
        } else if (data.status == 400) {
          alert("Create Account Failed!")
        } 
        // else if (user.role == 4) {
        //   this.router.navigateByUrl('/staff');
        // }
        

      



      // luu lai trang trc roi quay lai trang do, sau do xoa di
      // this.router.navigateByUrl('/students');
      // localStorage.setItem('token', res.result);
    },

      error => {
        alert("Create Account Failed!")
        
        console.log(error)
        // this.router.navigate(['/login']);
      }

    );


  }
 
  
  reloadParent() {
    this.ngOnInit();
  }


}




