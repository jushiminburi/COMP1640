import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-comment',
  templateUrl: './input-comment.component.html',
  styleUrls: ['./input-comment.component.css']
})
export class InputCommentComponent {
  @Input() postId!: number;
  

}

