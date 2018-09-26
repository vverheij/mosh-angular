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
    console.log('Deleting post ' + id + '!');
    return this.http.delete(this.url + '/' + id)
      .pipe(catchError((error: any) => {
        console.log('in service: Error status ' + error.status + ' occurred');
        if (error.status === 404){
          console.log('in service: Returning NotFoundError');
          let nfError = new NotFoundError(error);
            if (nfError instanceof NotFoundError){
              console.log('Created NotFoundError');
              console.log(nfError);
            }
          throw of(new NotFoundError(error));
        }
        console.log('in service: Returning AppError');
        return of(new AppError(error));
    }));
  }
}