import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-create-idea',
  templateUrl: './create-idea.component.html',
  styleUrls: ['./create-idea.component.css']
})
export class CreateIdeaComponent {

  // ngOptionTopic = ["", "Topic 1", "Topic 2", "Topic 3", "Topic 4",]

  // status: any;
  // ideaForm!: FormGroup;

  // categories: any[] = [];

  // getlistIdea() {
  //   this.api.getCategory().subscribe((res: any) => {
  //     const data = JSON.parse(res);
  //     this.categories = data.data;


  //   })


  // }

  // deleteIdea(id: number) {
  //   if(confirm("Are you sure to delete this category?")){
  //     this.api.deleteIdea(id).subscribe(async (res: any) => {

  //       if (res.status == 200) {
  //         // await this.getlistCategory();
  //         await location.reload();
  //         alert("Delete idea successfully!");

  //       }

  //     },(err: any) => {
  //       alert("Delete idea failed!");
  //       location.reload();


  //     }
  //     )


  //   }

  // }






  // selectedFiles?: FileList;
  // currentFile?: File;

  // selectFile(event: any, fieldName: string): void {
  //   // this.selectedFiles = event.target.files;
  //   // this.formData = new FormData();

  //   // if (this.selectedFiles!.length > 0) {
  //   // for (let i = 0; i < this.selectedFiles!.length; i++) {
  //   //   const file: File = this.selectedFiles![i];
  //   //   this.formData.append('file[]', file, file.name);
  //   // }

  //   if (event.target.files.length > 0) {
  //     for (let i = 0; i < event.target.files.length; i++) {
  //       const file: File = event.target.files[0];

  //       this.ideaForm.get(fieldName)!.setValue(file);

  //     }
  //   }


  // }

  // addIdea() {
  //   var formData = new FormData();
  //   for(let key in this.ideaForm.value){
  //     //check null or empty value
  //     if(this.ideaForm.get(key)?.value != null && this.ideaForm.get(key)?.value != ""){
  //       formData.append(key, this.ideaForm.get(key)?.value);
  //     }


  //   }
  //   this.api.addEvent(formData).subscribe((response) => {

  //     const data = JSON.parse(response);
  //     if (data.status == 200) {
  //       alert("Add idea successfully!");
  //       location.reload();
  //     } else {
  //       alert("Add idea failed!");
  //     }

  //   },
  //     (err: any) => {
  //       alert("Add idea failed!");
  //     })
  // }

  // events: any[] = [];


  // getListIdea() {


  //   this.api.getIdeas().subscribe((response) => {
  //     const data = JSON.parse(response);
  //     if(data.status == 200){

  //       this.events = data.data;

  //     } else {
  //       alert("Get ideas failed!");
  //     }




  //   }, (err: any) => {
  //     alert("Get ides failed!");
  //   })
  // }


  // // editEvent() {
  // //   const deadlineIdea = this.datePipe.transform(this.eventForm.value.deadlineComment, 'yyyy-MM-dd');
  // //   const deadlineComment = this.datePipe.transform(this.eventForm.value.deadlineComment, 'yyyy-MM-dd');
  // //   const formData = {
  // //     name: this.eventForm.value.name,

  // //     deadlineIdea: deadlineIdea,
  // //     deadlineComment: deadlineComment

  // //   };
  // //   this.api.submitRegistrationForm(formData).subscribe((response) => {
  // //     console.log(response);
  // //   });
  // // }











  // constructor(
  //   private http: HttpClient,
  //   private api: ApiService,
  //   private router: Router,
  //   private fb: FormBuilder,
  //   private dialog: MatDialog, private datePipe: DatePipe) {

  //     this.ideaForm = this.fb.group({
  //       id: new FormControl(''),
  //       files: new FormControl(null),
  //       title: new FormControl('', Validators.required),
  //       content: new FormControl('', Validators.required),
  //       anonymous: new FormControl(null, Validators.required),
  //       categoryId: new FormControl('', Validators.required),
  //       status: new FormControl('', Validators.required),
  //       eventId: new FormControl('', Validators.required),


  //     })

  // } //dependency injection



  // // createAccountForm = new FormGroup({

  // //   firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
  // //   lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),

  // //   email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(9)]),
  // //   password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  // //   role: new FormControl('', [Validators.required]),
  // //   department: new FormControl('', [Validators.required]),
  // //   avatar: new FormControl(File)
  // //  })



  // ngOnInit(): void {
  //   // this.newAccount();
  //   this.getListIdea();

  // }

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
