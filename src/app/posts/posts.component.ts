import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { BadInput} from './../common/bad-input';
//import { Http } from '@angular/http';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  private url = 'https://jsonplaceholder.typicode.com/posts'; 
  posts: any[];

  constructor(private service: PostService ) { 
  }

  createPost(input: HTMLInputElement) {
    let post = { title: input.value }
    input.value = '';

    this.service.createPost(post)
      .subscribe(
        response => {
          post['id'] = response.json().id;
          this.posts.splice(0, 0, post);
          console.log(response.json());
        } , 
        (error: AppError) => {
          alert('Error updating');
          if (error instanceof BadInput){
            //this.form.setError(error.json());
            alert('Bad input occurred.');
            console.log(error);            
          } else {
            alert('An unexpected error occurred.');
            console.log(error);
          }
        }
      );
  }



  updatePost(post) {
    this.service.updatePost(post)
      .subscribe(
        response => {
          console.log(response.json())
      }, 
      (error: AppError) => {
        alert('Error updating');
        if (error instanceof NotFoundError) {
          alert('This post was not found');
          //console.log(error)
        } else {
          alert('An unexpected error occurred!')
          //console.log(error)
        }
      });
  }

  deletePost(post) {
    this.service.deletePost(post.id)
      .subscribe(
        response => {
          let index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
        }, 
        (error: AppError) => {
          if (error instanceof NotFoundError){
             alert('in component: This post has already been deleted.');
             //console.log(error);
          } else {      
            alert('in component: An unexpected error occurred.');
            //console.log(error);
            //throw error;
          }
        }
      );
  }

  ngOnInit() {
    this.service.getPosts()
      .subscribe(
        response => {
          this.posts = response.json();
        },
        error => {
          alert('An unexpected error occurred.');
          console.log(error);
        }
      );
    }
}
