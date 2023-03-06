import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  addCategoryForm! : FormGroup;
  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router) { }

  isShowForm = false;
  addNewCategory() {
    
    this.isShowForm = false;
  }

  ngOnInit(): void { }

  
  onSubmit(data: any) {


  }

}

