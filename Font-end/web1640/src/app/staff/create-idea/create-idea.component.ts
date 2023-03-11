import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from 'src/app/api.service';

@Component( {
  selector: 'app-create-idea',
  templateUrl: './create-idea.component.html',
  styleUrls: [ './create-idea.component.css' ]
} )
export class CreateIdeaComponent
{

  ngOptionTopic = ["", "Topic 1", "Topic 2", "Topic 3", "Topic 4",]
  ideaForm!: FormGroup;

  selectedFiles: FileList = new FileList();
  currentFile?: File;
  progress = 0;

  currentPage: number = 1;
  totalPages: number = 0;
  pageArray: number[] = [];
  limit: number = 5;

  changePage(i: number): void {
    // const element = document.getElementById('paginator');
    // element!.classList.add('active');
    

    this.currentPage = i
    this.getlistIdea();
  }


  nextPage() {
    this.currentPage++;
    this.getlistIdea();
  }

  previousPage() {
    this.currentPage--;
    this.getlistIdea();
  }

  

  getlistIdea() {
    this.api.getEvents().subscribe((res: any) => {
      const data = JSON.parse(res);
      if (data.status == 200) {
        console.log(res);
        var events = JSON.parse(res);
        console.log(events);
        this.events = events.data.listUser;
        this.totalPages = Math.ceil(events.data.totalIdea / this.limit);
        this.pageArray = Array(this.totalPages).fill(0).map((x, i) => i+1) 
      }

    })


  }


  editIdea(id: any) {
    if (confirm("Are you sure to edit this account?")) {
     

      var formData: any = new FormData();
      for (let key in this.ideaForm.value) {
        console.log(key);
        formData.append(key, this.ideaForm.get(key)!.value);
      }
      console.log(formData);

      this.api.editUser(id, formData
      ).subscribe(async (res: any) => {
        var data = JSON.parse(res);

        if (data.status == 200) {

          // Reload current page
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/admin/accountmanager']).then(() => {
              
              this.toast.success({ detail: "Edit Account Success!", duration: 3000, position: "top-right" })


            })
          })


          // this.router.navigate(['/admin'])
        } else if (data.status == 400) {
          this.toast.warning({ detail: "Edit Account Failed!", duration: 3000, position: "top-right" })
          alert("Edit Account Failed!")

        }

      },

        error => {
          this.toast.error({ detail: "Edit Account Failed!", duration: 3000, position: "top-right" })
          console.log(error)

        });


    }
  }


  deleteIdea(id: number) {
    if(confirm("Are you sure to delete this category?")){
      this.api.deleteIdeas(id).subscribe(async (res: any) => {

        if (res.status == 200) {
          // await this.getlistCategory();
          await location.reload();
          alert("Delete idea successfully!");

          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/staff']).then(() => {
             
              this.toast.success({ detail: "Delete Account Success!", duration: 3000, position: "top-right" })
            })
          })

        } else if (res.status == 400) {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/staff']).then(() => {
             
              this.toast.error({ detail: "Delete idea failed!", duration: 3000, position: "top-right"})
            })
          })
        }


      },(err: any) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/staff']).then(() => {
           
            this.toast.error({ detail: "Delete idea failed!", duration: 3000, position: "top-right"})
          })
        })


      }
      )


    }

  }


  async selectFile(event: any) {
    // this.selectedFiles = event.target.files;
    // this.formData = new FormData();

    // if (this.selectedFiles!.length > 0) {
    // for (let i = 0; i < this.selectedFiles!.length; i++) {
    //   const file: File = this.selectedFiles![i];
    //   this.formData.append('file[]', file, file.name);
    // }

    this.selectedFiles = event.target.files;
    await this.ideaForm.get('files')?.setValue(this.selectedFiles);
  }

  addIdea() {

    var formData = new FormData();
    for(let key of Object.keys(this.ideaForm.value)){
      if(this.ideaForm.get(key)?.value != null && this.ideaForm.get(key)?.value != ""){
        formData.append(key, this.ideaForm.get(key)?.value);
      }
     
    }
    
    // for(let i = 0; i < this.selectedFiles.length; i++){
    //   formData.append('files', this.selectedFiles[i]);
    // }

    this.api.addIdeas(formData).subscribe((response) => {

      const data = JSON.parse(response);
      if (data.status == 200) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/staff']).then(() => {
            
            this.toast.success({ detail: "Edit Account Success!", duration: 3000, position: "top-right" })
          })
        })
      } else {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/staff']).then(() => {
            
            this.toast.error({ detail: "Add idea failed!", duration: 3000, position: "top-right" })
          })
        })
      }

    },
      (err: any) => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/staff']).then(() => {
           
            this.toast.error({ detail: "Add idea failed!", duration: 3000, position: "top-right" })
          })
        })
      })
  }

  events: any[] = [];
  categories: any[] = [];

  getListEvents() {
    this.api.getEvents().subscribe((res: any) => {
      const data = JSON.parse(res);
      this.events = data.data;
    })
  }
  

  getListCategory() {
    this.api.getCategory().subscribe((res: any) => {
      const data = JSON.parse(res);
      this.categories = data.data;
    })
  }


  getListIdea() {


    this.api.getIdeas().subscribe((response) => {
      const data = JSON.parse(response);
      if(data.status == 200){

        this.events = data.data;

      } else {
        alert("Get ideas failed!");
      }




    }, (err: any) => {
      alert("Get ides failed!");
    })
  }


  // editEvent() {
  //   const deadlineIdea = this.datePipe.transform(this.eventForm.value.deadlineComment, 'yyyy-MM-dd');
  //   const deadlineComment = this.datePipe.transform(this.eventForm.value.deadlineComment, 'yyyy-MM-dd');
  //   const formData = {
  //     name: this.eventForm.value.name,

  //     deadlineIdea: deadlineIdea,
  //     deadlineComment: deadlineComment

  //   };
  //   this.api.submitRegistrationForm(formData).subscribe((response) => {
  //     console.log(response);
  //   });
  // }











  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog, private datePipe: DatePipe, private toast: NgToastService) {

      this.ideaForm = this.fb.group({
        id: new FormControl(''),
        files: new FormControl(null),
        title: new FormControl('', Validators.required),
        content: new FormControl('', Validators.required),
        anonymous: new FormControl(null),
        categoryId: new FormControl('', Validators.required),
        eventId: new FormControl('', Validators.required),

      })

  } //dependency injection



  // createAccountForm = new FormGroup({

  //   firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),

  //   email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(9)]),
  //   password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  //   role: new FormControl('', [Validators.required]),
  //   department: new FormControl('', [Validators.required]),
  //   avatar: new FormControl(File)
  //  })



  ngOnInit(): void {
    // this.newAccount();
    this.getListCategory();
    this.getListEvents();

  }





}
