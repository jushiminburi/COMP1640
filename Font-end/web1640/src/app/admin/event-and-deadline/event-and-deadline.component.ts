import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/api.service';

interface Event {

  name: string,
  deadlineIdea: string,
  deadlineComment: string,


}

@Component({

  templateUrl: './event-and-deadline.component.html',
  styleUrls: ['./event-and-deadline.component.css']
})

export class EventAndDeadLineComponent implements OnInit {

  eventForm!: FormGroup;

  addEvent(data: any) {
    console.log(data);
    const datePipe = new DatePipe('en-US');
    const formattedDateIdea = datePipe.transform(data.deadlineIdea, 'yyyy-MM-dd HH:mm');
    const formattedDateComment = datePipe.transform(data.deadlineComment, 'yyyy-MM-dd HH:mm');

    data.deadlineIdea = formattedDateIdea;
    data.deadlineComment = formattedDateComment;


    if (confirm("Are you sure to add this event?")) {
      this.api.addEvent(data).subscribe((response) => {
        const data = JSON.parse(response);
        if (data.status == 200) {
          this.toast.success({ detail: "Edit event successfully!", summary: "Success", duration: 3000 });
          this.router.navigate(['admin/eventlist']);
        } else {
          this.toast.error({ detail: "Edit event failed!", summary: "Error", duration: 3000 });
        }
      }, (err: any) => {
        this.toast.error({ detail: "Edit event failed!", summary: "Error", duration: 3000 });
      }
      )

    }



  }


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
  Id: any = "";




  constructor(private api: ApiService, private router: Router,
    private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private toast: NgToastService) {
    this.eventForm = this.fb.group({
      

      name: new FormControl('', [Validators.required]),
      deadlineIdea: new FormControl(null),
      deadlineComment: new FormControl(null)
    })
  }




  // loadEvents(): void {
  //   this.api.getEvents().subscribe(
  //     res => {
  //       console.log(res);
  //       var events = JSON.parse(res).data;
  //       console.log(events);


  //       for(let event of events) {
  //         let deadlineIdea: Date = new Date(event.deadlineIdea);
  //         if(new Date() > deadlineIdea) {
  //           event['status'] = "Done";
  //         } else {
  //           event['status'] = "Doing";
  //         }

  //       }
  //       this.events = events;
  //       // this.totalPages = Math.ceil(users.data.totalUser / this.limit);
  //       // this.pageArray = Array(this.totalPages).fill(undefined).map((x, i) => i + 1)
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }

  // changePage(i: number): void {
  //   // const element = document.getElementById('paginator');
  //   // element!.classList.add('active');


  //   this.currentPage = i
  //   this.loadStudents();
  // }


  // nextPage() {
  //   this.currentPage++;
  //   this.loadStudents();
  // }

  // previousPage() {
  //   this.currentPage--;
  //   this.loadStudents();
  // }



  ngOnInit() {

    

  }

}


