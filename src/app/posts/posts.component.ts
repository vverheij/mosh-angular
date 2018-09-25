import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';



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

    this.service.createPost(post)
      .subscribe(
        response => {
          post['id'] = response.json().id;
          this.posts.splice(0, 0, post);
          console.log(response.json());
        }, 
        (error: Response) => {
          if (error.status === 400){
            //this.form.setError(error.json());
          }  else {
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
      (error) => {
        alert('An unexpected error occurred.');
        console.log(error)
      });
    //this.http.put(this.url, JSON.stringify(post));
  }

  deletePost(post) {
    this.service.deletePost(234)
      .subscribe(
        response => {
          let index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
        }, 
        (error: Response) => {
          if (error.status == 404)
            alert('this post has already been deleted.')
          alert('An unexpected error occurred.');
          console.log(error)
        });
  }

  ngOnInit() {
    this.service.getPosts()
      .subscribe(response => {
      this.posts = response.json();
    });
  }
}
