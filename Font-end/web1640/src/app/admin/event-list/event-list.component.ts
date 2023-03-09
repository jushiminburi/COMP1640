import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface NewDeadline {

  Topic: string | null,
  DLTopic: Date | null,
  DLComment: Date | null,
  Description: string | null,
}
@Component({

  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

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
  reloadParent() {
    this.ngOnInit();
  }
}
