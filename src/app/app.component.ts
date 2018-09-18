import { FavoriteChangedEventArgs } from './favorite/favorite.component';
import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courses = [
    { id: 1, name: 'course 1' },
    { id: 2, name: 'course 2' },
    { id: 3, name: 'course 3' }
];
  title = 'hello-world';
  post = {
    title: "Title",
    isFavorite : true
  }
  tweet = {
    body: "Here is the body of a tweet...",
    isLiked: false,
    likesCount: 10
  }
  viewMode = 'iets';

  onFavoriteChanged(eventArgs: FavoriteChangedEventArgs) {
    console.log("Favorite Changed: ", eventArgs.newValue);
  }

  onLikeClicked(cnt) {
    this.tweet.likesCount = cnt;
    console.log("Like was clicked: "+ cnt + " times");
  }
  onAdd() {
    this.courses.push({id: 4, name: 'course 4'});
  }
  onRemove(course) {
    let index = this.courses.indexOf(course);
    this.courses.splice(index, 1);
  }

  onChange(course) {
    course.name = 'UPDATED';
  }

  loadCourses(){
    this.courses = [
      { id: 1, name: 'course 1' },
      { id: 2, name: 'course 2' },
      { id: 3, name: 'course 3' }
    ];
  }

  trackCourse(index, course) {
    return course ? course.id : undefined;
  }

  canSave = false;
}
