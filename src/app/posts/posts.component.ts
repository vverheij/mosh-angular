import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { BadInput} from './../common/bad-input';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];

  constructor(private service: PostService ) { 
  }

  createPost(input: HTMLInputElement) {
    let post = { title: input.value }
    input.value = '';

    this.service.create(post)
      .subscribe(
        response => {
          post['id'] = response.json().id;
          this.posts.splice(0, 0, post);
          console.log(response.json());
        } , 
        (error: AppError) => {
          if (error instanceof BadInput){
            //this.form.setError(error.json());
            alert('Bad input occurred.');
       
          } else {
            throw error;
          }
        }
      );
  }

  updatePost(post) {
    this.service.update(post)
      .subscribe(
        response => {
          console.log(response.json())
        }
    );
  }

  deletePost(post) {
    this.service.delete(234)
      .subscribe(
        response => {
          let index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
        }, 
        (error: AppError) => {
          if (error instanceof NotFoundError){
             alert('This post has already been deleted.');
          } else {      
            throw error;
          }
        }
      );
  }

  ngOnInit() {
    this.service.getAll()
      .subscribe(
        response => {
          this.posts = response.json();
        }
        // ,
        // error => {
        //   alert('An unexpected error occurred.');
        //   console.log(error);
        // }
      );
    }
}
