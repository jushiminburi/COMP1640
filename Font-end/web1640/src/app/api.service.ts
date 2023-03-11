import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

const api = "http://139.162.47.239/api/";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  login(email:string='', password:string=''): Observable<any>{
    var userInfo = { email:email, password:password }
    var dataJson = JSON.stringify(userInfo);
    console.log(userInfo);
    // const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    return this.http.post(api + 'user/login'
    , dataJson// data minh se gui len
    , {headers: headers} //bao gui kieu json cho phia server va kieu du lieu tra ve tu server la json text
  )
  }//l
  // getAll():Observable<Account[]>{
  //   return this.http.get<Account[]>(api).pipe(
  //   )
  // }

  deleteCategory(id: number){

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Baerar ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

      return this.http.get(api + `category/delete/${id}}`
      , {headers:httpOptions.headers, responseType: 'text'})//stringify de chuyen doi tu object sang json


  }

  getCategory() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

      return this.http.get(api + 'category/list'
      , {headers:httpOptions.headers, responseType: 'text'})//stringify de chuyen doi tu object sang json


  }

  addCategory(name: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
    const category = {name: name}

  }

  editEvent(formData: FormData){
   
    console.log(formData);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
    });
    
    return this.http.put(api + 'event/update', formData, {headers:headers, responseType: 'text'})//stringify de chuyen doi tu object sang json
 

  }


  deleteEvent(id: any){
    console.log(id);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Baerar ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

      return this.http.get(api + `event/delete/${id}}`
      , {headers:httpOptions.headers, responseType: 'text'})//stringify de chuyen doi tu object sang json


  }





  getComment(page: number, limit: number) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
      params: { page: page.toString(), limit: limit.toString() }
    };
   
      return this.http.get(api + 'category/list'
      , {headers:httpOptions.headers, responseType: 'text', params: httpOptions.params})//stringify de chuyen doi tu object sang json


  }

  addComment(formData: FormData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
    
    
    return this.http.post(api + 'comment/create', formData, {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json

  }

  editComment(id: number, formData: FormData){
    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
    });
    
    return this.http.put(api + `comment/update/${id}`, formData, {headers:headers, responseType: 'json'})//stringify de chuyen doi tu object sang json

  }


  deleteComment(id: any){
    console.log(id);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Baerar ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
   
      return this.http.delete(api + `comment/delete/${id}`
      , {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json


  }








 

  // addReplyComment(formData: FormData) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //     })
  //   };
    
    
  //   return this.http.post(api + 'comment/create', formData, {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json

  // }




  // editReplyComment(id: number, formData: FormData){
    

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
      
  //     'Access-Control-Allow-Origin': '*',
  //     'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
  //   });
    
  //   return this.http.put(api + `comment/update/${id}`, formData, {headers:headers, responseType: 'json'})//stringify de chuyen doi tu object sang json

  // }


  deleteReplyComment(id: any){
    console.log(id);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Baerar ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
   
      return this.http.delete(api + `comment/delete/${id}`
      , {headers:httpOptions.headers, responseType: 'json'})//stringify de chuyen doi tu object sang json


  }
























  getEvents() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

      return this.http.get(api + 'event/list'
      , {headers:httpOptions.headers, responseType: 'text'})//stringify de chuyen doi tu object sang json


  }

  addEvent(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };


    return this.http.post(api + 'category/add', data, {headers:httpOptions.headers, responseType: 'text'})//stringify de chuyen doi tu object sang json

  }



  deleteIdeas(id: number){

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Baerar ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

      return this.http.get(api + `ideas/delete/${id}}`
      , {headers:httpOptions.headers, responseType: 'text'})//stringify de chuyen doi tu object sang json


  }

  getIdeas() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

      return this.http.get(api + 'ideas/list'
      , {headers:httpOptions.headers, responseType: 'text'})//stringify de chuyen doi tu object sang json


  }

  addIdeas(formData: FormData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };

    return this.http.post(api + 'idea/add', formData, {headers:httpOptions.headers, responseType: 'text'})//stringify de chuyen doi tu object sang json

  }



  getAnAcount(email:string=''){
    const userInfo = { email:email}
    const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(api + 'getAnAcount', userInfo, {headers:headers, responseType: 'text'})//stringify de chuyen doi tu object sang json
  }
  testtestNewAccount(email: string='', testtestNewAccount: Object){
    const userInfo = { email: email, newaccount: testtestNewAccount}
    const headers = new HttpHeaders().set('Content-Type', 'application/json') ;
    return this.http.post(api + 'testtestNewAccount', userInfo, {headers:headers, responseType: 'text'})//stringify de chuyen doi tu object sang json
  }
  createNewAccount(formData: FormData){





    const headers = new HttpHeaders({

      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
    });


    console.log(localStorage.getItem('accessToken'));




    return this.http.post(api + 'user/register', formData, {headers:headers, responseType: 'text'})//stringify de chuyen doi tu object sang json
  }

  editUser(id: string, formData: FormData){

    let form = {

      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      department: formData.get('department'),
      role: formData.get('role'),

    }
    console.log(form);





    const headers = new HttpHeaders({
      'Content-Type': 'application/json',

      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
    });

    return this.http.put(api + `user/update/${id}`, form, {headers:headers, responseType: 'text'})//stringify de chuyen doi tu object sang json
  }

  changePassword(formData: Object){
    let newForm = new FormData();
    const helper = new JwtHelperService();
    const user = helper.decodeToken(localStorage.getItem('accessToken')|| '{}');
    formData = {...formData, userId: user!.id}


    console.log(user)
    newForm.append('userId', user.id.toString());
    console.log(newForm.get('userId'));
    console.log(formData);




    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.put(api + 'user/change-password'
    , newForm// data minh se gui len
    , {headers:headers, responseType: 'text'} //bao gui kieu json cho phia server va kieu du lieu tra ve tu server la json text
  )
  }//resetPassword
  getUsers(page?: number, limit?: number): Observable<any>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // 'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*',
        // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        // 'Accept': 'application/json'

      })
    };

    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');
    // headers.append('Authorization', 'Baeare ' + localStorage.getItem('accessToken'));

    console.log(localStorage.getItem('accessToken'));
    // console.log(JSON.stringify(formData));
    // const dataUser = JSON.stringify(formData)
    if(page == undefined || limit == undefined){
      return this.http.get(api + 'user/list-user'
      , {headers:httpOptions.headers, responseType: 'text'})//stringify de chuyen doi tu object sang json
    }
    else {
      console.log(page);
      return this.http.get(api + `user/list-user?page=${page}&limit=${limit}`
      , {headers:httpOptions.headers, responseType: 'text',})//stringify de chuyen doi tu object sang json

    }
  }



  deleteUser(id: number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Accept': 'application/json'
      }),
      body: {}
    };

    return this.http.post(api + `user/delete/${id}`, {}, httpOptions);
  }

}
