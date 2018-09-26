import { DataService } from './data.service';
//import { BadInput } from './../common/bad-input';
//import { AppError } from './../common/app-error';
//import { NotFoundError } from './../common/not-found-error';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
//import { of } from 'rxjs';
//import { catchError } from 'rxjs/operators';
//import { AppError } from '../common/app-error';
//import { NotFoundError } from '../common/not-found-error';
//import {throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService extends DataService {
  constructor(http: Http) { 
    super('https://jsonplaceholder.typicode.com/posts', http);
  }

// al the code below has been moved to superclass DataService;
/*
  getPosts() {
    return this.http.get(this.url);
  }

  createPost(post) {
    return this.http.post(this.url, JSON.stringify(post))
      .pipe(catchError((error: any) => {
        if (error.status === 400){
          return throwError(new BadInput(error));
        }
        return throwError(new AppError(error));
      }));
  }

  updatePost(post) {
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true}));
  }
  
  deletePost(id){
    return this.http.delete(this.url + '/' + id)      
      .pipe(catchError((error: any) => {
        if (error.status === 404){
          return throwError(new NotFoundError(error));
        }
        return throwError(new AppError(error));
      //.pipe(catchError(this.handleError); // this does not work
    }));
  }

  // this does not work
  private handleError(error: Response) {
    if (error.status === 404){
      return throwError(new NotFoundError(error));
    }
    return throwError(new AppError(error));
  }
  */
}