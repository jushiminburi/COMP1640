import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

interface NewDeadline {

  Topic: string | null,
  DLTopic: string | null,
  DLComment: string | null,
  Description: string | null,
}

@Component({

  templateUrl: './event-and-deadline.component.html',
  styleUrls: ['./event-and-deadline.component.css']
})

export class EventAndDeadLineComponent {
  // newDeadline: NewDeadline = {
  //   Topic: null,
  //   DLTopic: null,
  //   DLComment: null,
  //   Description: null,



  // };

  // deadlineForm = new FormGroup({
  //   Topic: new FormControl('', [Validators.required]),
  //   DLTopic: new FormControl('', [Validators.required]),
  //   DLComment: new FormControl('', [Validators.required]),
  //   Description: new FormControl('', [Validators.required]),
  // })

  
  
  // DeadlineForm = new FormGroup({
  //   Topic: new FormControl(''),
  //   DLTopic: new FormControl(''),
  //   DLComment: new FormControl(''),
  //   Description: new FormControl(''),

  // })

  // createDeadline = new FormGroup({
  //   Topic: new FormControl(''),
  //   DLTopic: new FormControl(''),
  //   DLComment: new FormControl(''),
  //   Description: new FormControl(''),
    
  // }
  // )
  // CreateDeadline(data: any) {
  //   //get password from localstorage
  //   var deadline: any = localStorage.getItem('deadline');
  //   var topic = JSON.parse(deadline).Topic;;
  //   // console.log("dsadsds" + phone);

  //   this.deadline = {
  //     Topic: data.Topic,
  //     DLTopic: data.DLTopic,
  //     DLComment: data.DLComment,
  //     Description: data.Description,
  //   }

  //   console.log("hii");
  


  // }
  // deadline: NewDeadline = {
  
  //   Topic: null,
  //   DLTopic: null,
  //   DLComment: null,
  //   Description: null,


  // };

  // status: any;
  // categoryForm!: FormGroup;

  // categories: any[] = [];


  // isShowForm = false;
  
  // getlistCategory() {
  //   this.api.getCategory().subscribe((res: any) => {
  //     const data = JSON.parse(res);
  //     this.categories = data.data;
      
      
  //   })


  // }

  // deleteCategory(id: number) {
  //   if(confirm("Are you sure to delete this category?")){ 
  //     this.api.deleteCategory(id).subscribe(async (res: any) => {
       
  //       if (res.status == 200) {
  //         // await this.getlistCategory();
  //         await location.reload();
  //         alert("Delete category successfully!");
          
  //       }
        
  //     },(err: any) => {
  //       alert("Delete category failed!");
  //       location.reload();
        

  //     }
  //     )

    
  //   }
   
  // }


  // addCategory(data: any) {

  //   if (this.categoryForm.invalid) {
  //     alert("Please fill all fields!");
  //     return;

    
  //   } else {
  //     const name = data.value.name;
  //     this.api.addCategory(name).subscribe(async (res: any) => {
  //       if (res.status == 200) {
  //         await location.reload();
  //         alert("Add category successfully!");
          
  //       }
        
  //     }, (err: any) => {
  //       alert("Add category failed!");
  //       location.reload();
        

  //     }
  //     )

  //   }
   


  // }

  // eventForm = new FormGroup({
  //   name: new FormControl('', Validators.required),
  //   deadlineIdea: new FormControl('', Validators.required),
  //   deadlineComment: new FormControl('', Validators.required),
  // });

  // addEvent() {
  //   const deadlineIdea = this.datePipe.transform(this.eventForm.value.deadlineComment, 'yyyy-MM-dd');
  //   const deadlineComment = this.datePipe.transform(this.eventForm.value.deadlineComment, 'yyyy-MM-dd');
  //   const data = {
  //     name: this.eventForm.value.name,
     
  //     deadlineIdea: deadlineIdea,
  //     deadlineComment: deadlineComment

  //   };
  //   this.api.addEvent(data).subscribe((response) => {

  //     const data = JSON.parse(response);
  //     if (data.status == 200) {
  //       alert("Add event successfully!");
  //       location.reload();
  //     } else {
  //       alert("Add event failed!");
  //     }

  //   },
  //     (err: any) => {
  //       alert("Add event failed!");
  //     })
  // }

  // events: any[] = [];


  // getAnEvent() {
    
    
  //   this.api.getEvents().subscribe((response) => {
  //     const data = JSON.parse(response);
  //     if(data.status == 200){
        
  //       this.events = data.data;
       
  //     } else {
  //       alert("Get events failed!");
  //     }
      
      
      
      
  //   }, (err: any) => {
  //     alert("Get events failed!");
  //   })
  // }





  // constructor(
  //   private http: HttpClient,
  //   private api: ApiService,
  //   private router: Router,
  //   private fb: FormBuilder,
  //   private dialog: MatDialog, private datePipe: DatePipe) {

  //     this.categoryForm = this.fb.group({
  //       id: new FormControl(null),
  //       name: new FormControl('', [Validators.required]),
  //       createdAt: new FormControl(null),
  //       updatedAt: new FormControl(null)
  //     })

  // } //dependency injection




  // ngOnInit(): void {
  //   // this.newAccount();
  //   this.getAnEvent();

  // }
  
}


 