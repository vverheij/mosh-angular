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
    let post = { id: null, title: input.value }
    this.posts.splice(0, 0, post);

    input.value = '';

    this.service.create(post)
      .subscribe(
        // response => {
        //   post['id'] = response.json().id;
        //   this.posts.splice(0, 0, post);
        //   console.log(response.json());
        // }, 
        (newPost: any) => {
          post.id = newPost.id;
          //this.posts.splice(0, 0, post);
          console.log('Post ' + post.title + ' created'); 
        }, 
        (error: AppError) => {
          this.posts.splice(0,1);
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
        // response => {
        //   console.log(response.json())
        // }
        updatedPost => {
          console.log(updatedPost);
        }
    );
  }

  deletePost(post) {
    // optimistic delete
    let index = this.posts.indexOf(post);
    this.posts.splice(index, 1);

    this.service.delete(post.id)
      .subscribe(
        // v 1
        // response => {
        //   let index = this.posts.indexOf(post);
        //   this.posts.splice(index, 1);

        // v 2
        // () => {
        //   let index = this.posts.indexOf(post);
        //   this.posts.splice(index, 1);
        // }

        // v3 // optimistic delete
        null
        , 
        (error: AppError) => {
          // undo optimistic delete
          console.log('Error occured, undoing delete')
          this.posts.splice(index, 0, post);
          
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
        posts => {
          this.posts = posts;
        }
        // ,
        // error => {
        //   alert('An unexpected error occurred.');
        //   console.log(error);
        // }
      );
    }
}
