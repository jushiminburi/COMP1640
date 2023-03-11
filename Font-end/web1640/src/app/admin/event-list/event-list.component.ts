import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/api.service';


interface Event {
  id: number,
  name: string,
  deadlineIdea: string,
  deadlineComment: string,
  totalIdea: number,
  totalDislike: number,
  totalLike: number,
  totalComment: number,
  createdAt: string,
  updatedAt: string,
  status: string

}
@Component({

  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[] = []; // List of users
  currentPage: number = 1;
  totalPages: number = 0;
  pageArray: number[] = [];
  limit: number = 5;
  ststus: string = "";




  pagedEvents: Event[] = []; // List of users for current page
  totalItems?: number; // Total number of users

  page?: number;

  accounts?: any[];

  eventForm!: FormGroup;

  constructor(private api: ApiService, private router: Router,
    private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private toast: NgToastService) {
    this.eventForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      deadlineIdea: ['', Validators.required],
      deadlineComment: ['', Validators.required],
      totalIdea: ['', Validators.required],
      totalDislike: ['', Validators.required],
      totalLike: ['', Validators.required],
      totalComment: ['', Validators.required],
      createdAt: ['', Validators.required],
      updatedAt: ['', Validators.required]
    })
  }

  delete(id: any) {
    if (confirm("Are you sure to delete this event?")) {
      this.api.deleteEvent(id).subscribe(
        res => {
          console.log(res);
          this.toast.success({ detail: 'Delete event successfully!', position: 'top-right', duration: 3000 })
          this.loadEvents();
        },
        error => {
          console.log(error);
          this.toast.error({ detail: 'Error deleting event', position: 'top-right', duration: 3000 })
        }
      );

    }

  }

 

  editEvent(data: any) {
    console.log(data);
    const datePipe = new DatePipe('en-US');
    const formattedDateIdea = datePipe.transform(data.deadlineIdea, 'yyyy-MM-dd HH:mm');
    const formattedDateComment = datePipe.transform(data.deadlineComment, 'yyyy-MM-dd HH:mm');

    data.deadlineIdea = formattedDateIdea;
    data.deadlineComment = formattedDateComment;


    if (confirm("Are you sure to edit this event?")) {
      this.api.editEvent(data).subscribe((response) => {
        const data = JSON.parse(response);
        if (data.status == 200) {
          this.toast.success({ detail: "Edit event successfully!", summary: "Success", duration: 3000 });
          this.router.navigate(['admin/eventlist']);
        } else {
          this.toast.error({ detail: "Edit event failed!", summary: "Error", duration: 3000 });
        }
      }, (err: any) => {
        this.toast.error({ detail: "Edit event failed!", summary: "Error", duration: 3000 });
        console.log(err);
      }
      )

    }



  }

  getAnEvent(id: any) {

    //get event by id
    this.api.getEvents().subscribe(
      res => {

        var events = JSON.parse(res).data.list
        let event = events.filter((event: any) => event.id == id)[0];

        //convert date to dd/mm/yyyy - dùng moment cũng đc để chuyển giữa múi giờ.
        // let deadlineIdea: Date = new Date(event.deadlineIdea);
        // let deadlineComment: Date = new Date(event.deadlineComment);
        // event.deadlineIdea = deadlineIdea.getDate() + "/" + (deadlineIdea.getMonth() + 1) + "/" + deadlineIdea.getFullYear();
        // event.deadlineComment = deadlineComment.getDate() + "/" + (deadlineComment.getMonth() + 1) + "/" + deadlineComment.getFullYear();
        const datePipe = new DatePipe('en-US');
        const formattedDateIdea = datePipe.transform(event.deadlineIdea, 'yyyy-MM-dd');
        console.log(formattedDateIdea);

        const formattedDateComment = datePipe.transform(event.deadlineComment, 'yyyy-MM-dd');
        console.log(formattedDateComment);

        event.deadlineIdea = formattedDateIdea;
        event.deadlineComment = formattedDateComment;
        this.eventForm.patchValue(event);
        console.log(event);

      }, error => {
        console.log(error);
      }
    );


  }


  loadEvents(): void {
    this.api.getEvents().subscribe(
      res => {
        console.log(res);
        var events = JSON.parse(res).data.list;
        console.log(events);


        for (let event of events) {
          let deadlineIdea: Date = new Date(event.deadlineIdea);
          if (new Date() > deadlineIdea) {
            event['status'] = "Done";
          } else {
            event['status'] = "Doing";
          }

        }
        this.events = events;
        // this.totalPages = Math.ceil(users.data.totalUser / this.limit);
        // this.pageArray = Array(this.totalPages).fill(undefined).map((x, i) => i + 1)
      },
      error => {
        console.log(error);
      }
    );
  }

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



    this.loadEvents();

  }



}
