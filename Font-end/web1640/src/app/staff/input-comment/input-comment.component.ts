import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'input-comment',
  templateUrl: './input-comment.component.html',
  styleUrls: ['./input-comment.component.css']
})
export class InputCommentComponent {
  comment: string = '';
  @Input() postId!: number;
  

  uploadedFiles: File[] = [];

  onSelect(event: any) {
        for(let file of event.files) {
            //check error
            if(file.size <= 5000000) {
                this.uploadedFiles.push(file);
            }

        }

        console.log(this.uploadedFiles)

        
    }

    onClear(event: any) {
        this.uploadedFiles = [];
      console.log(this.uploadedFiles)
      
  }

  onRemove(event: any) {
    // // Truy cập đối tượng FileList của phần tử <p-fileUpload>
    // const fileList: FileList = event.fileInput.files;

    // // Lấy index của tệp tin bị xóa
    // const index = Array.prototype.indexOf.call(fileList, event.file);

    // // Loại bỏ tệp tin khỏi danh sách tệp tin đã chọn
    // this.uploadedFiles.splice(index, 1);
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
    console.log(this.uploadedFiles)


  
}

createComment() {


    let formData = new FormData();
    formData.append('content', this.comment);
    formData.append('ideaId', this.postId.toString());
    for (let i = 0; i < this.uploadedFiles.length; i++) {
      formData.append('files', this.uploadedFiles[i]);
    }
    this.api.createComment(formData).subscribe(data => {
      console.log(data);
      this.toast.success({ detail: "Comment successfully!", duration: 3000, position: "top-right" })
      this.comment = '';
      this.uploadedFiles = [];
    }, error => {
      this.comment = '';
      this.uploadedFiles = [];
      this.toast.error({ detail: "Comment failed!", duration: 3000, position: "top-right" })
      console.log(error)
      // this.router.navigate(['/login']);

    }
    );
  }

constructor(private api: ApiService, private router: Router,
  private route: ActivatedRoute, private http: HttpClient,
  private fb: FormBuilder, private toast: NgToastService) { }




}

