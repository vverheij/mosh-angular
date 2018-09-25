import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';

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

  // constructor(private http: Http ) { 
  // }

  // constructor(http: Http ) { 
  //   http.get(this.url) 
  //     .subscribe(response => {
  //       this.posts = response.json();
  //   });
  // }




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
        (error: Response) => {
          if (error.status === 400){
            //this.form.setError(error.json());
          } else {
            alert('An unexpected error occurred.');
            console.log(error);
          }
        });
  }



  updatePost(post) {
    this.service.updatePost(post)
      .subscribe(
        response => {
          console.log(response.json())
      }, 
      (error: Response) => {
        alert('An unexpected error occurred.');
        console.log(error)
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
             alert('This post has already been deleted.');
          } else {      
            alert('An unexpected error occurred.');
            console.log(error);
          }
    
        });
  }

  ngOnInit() {
    this.service.getPosts()
      .subscribe(response => {
      this.posts = response.json();
    }, error => {
      alert('An unexpected error occurred.');
      console.log(error);
    });
  }
}
