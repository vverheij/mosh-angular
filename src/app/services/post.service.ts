import { BadInput } from './../common/bad-input';
import { AppError } from './../common/app-error';
//import { NotFoundError } from './../common/not-found-error';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
//import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'https://jsonplaceholder.typicode.com/posts'; 

  constructor(private http: Http) { }

  getPosts() {
    return this.http.get(this.url);
  }

  createPost(post) {
    return this.http.post(this.url, JSON.stringify(post))
      .pipe(catchError((error: any) => {
        if (error.status === 400){
          return of(new BadInput(error));
        }
        return of(new AppError(error));
      }));
  }

  updatePost(post) {
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead: true}));
  }
  
  deletePost(id){
    return this.http.delete(this.url + '/' + id)
      .pipe(catchError((error: any) => {
        //return of(error); 
        if (error.status === 404){
          return of(new NotFoundError(error));
        }

        return of(new AppError(error));
    }));
  }
}

//okay, dat gaat lukken, mocht ik het toch niet lukken dan laat ik het wel even weten..... ;-)  