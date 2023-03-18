import { Component } from '@angular/core';

@Component({
  selector: 'list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css']
})
export class ListCommentComponent {
  comments?: any[] = [];

}
