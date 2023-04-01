import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-like-dislike',
  templateUrl: './like-dislike.component.html',
  styleUrls: ['./like-dislike.component.css']
})
export class LikeDislikeComponent {

  @Output() loadData = new EventEmitter();

  constructor(private api: ApiService, private router: Router,
    private route: ActivatedRoute, private http: HttpClient,
    private fb: FormBuilder, private toast: NgToastService) {
   
     }
  


  isLiked = false;
  isDisliked = false;

  like() {
    this.isLiked = !this.isLiked;

    // if (this.isLiked) {
    //   this.isDisliked = false;
    // }
    this.isDisliked = false;
    this.api.likeDislike(this.route.snapshot.params['id'], this.isLiked, this.isDisliked).subscribe((res: any) => {
      console.log(res);
      this.loadData.emit();
     
    } , (err: any) => {
      console.log(err);
      
    } )


  }

  dislike() {
    this.isDisliked = !this.isDisliked;

    // if (this.isDisliked) {
    //   this.isLiked = false;
    // }
    this.isLiked = false;

    this.api.likeDislike(this.route.snapshot.params['id'], this.isLiked, this.isDisliked).subscribe((res: any) => {
      console.log(res);
      this.loadData.emit();
     
    } , (err: any) => {
      console.log(err);
      
    } )
  }

}
