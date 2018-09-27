import { BadInput } from './../common/bad-input';
import { AppError } from './../common/app-error';
import { NotFoundError } from '../common/not-found-error';
//import { NotFoundError } from './../common/not-found-error';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

//import { AppError } from '../common/app-error';

import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
   constructor(private url: string, private http: Http) { }

  getAll() {
    return this.http.get(this.url)
      .pipe(map(response => {
         return response.json();
      }));
  }

  create(resource) {
    // throw an error 
    return this.http.post(this.url, JSON.stringify(resource))
      .pipe(map(response => {
        return response.json()
      }))
      .pipe((error) => {
          return throwError(new AppError(error));
      });

    /*
    return this.http.post(this.url, JSON.stringify(resource))
      .pipe(map(response => {
        return response.json()
      }))
      // .pipe(catchError((error: any) => {
      //   if (error.status === 400){
      //     return throwError(new BadInput(error));
      //   }
      //   return throwError(new AppError(error));
      // }));
      .pipe(catchError(this.handleError));
      */
  }

  update(resource) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({isRead: true}))
    .pipe(map(response => {
        return response.json();
      }
    ));
  }
  
  delete(id){
    // throw an error
    // return this.http.delete(this.url + '/' + id)
    // .pipe(map(response => {
    //   return response.json()
    // }))
    // .pipe((error) => {
    //     return throwError(new AppError(error));
    // });
    return this.http.delete(this.url + '/' + id) 
      // moved this part to handleError method     
      // .pipe(catchError((error: any) => {
      //   if (error.status === 404){
      //     return throwError(new NotFoundError(error));
      //   }
      //   return throwError(new AppError(error));
     .pipe(catchError(this.handleError));// this does not work
    
  }

  // this does not work
  private handleError(error: Response) {
    if (error.status === 400){
          return throwError(new BadInput(error));
    }

    if (error.status === 404){
      return throwError(new NotFoundError(error));
    }
    
    return throwError(new AppError(error));
  }
}