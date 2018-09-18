import { FavoriteChangedEventArgs } from './favorite/favorite.component';
import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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

  onFavoriteChanged(eventArgs: FavoriteChangedEventArgs) {
    console.log("Favorite Changed: ", eventArgs.newValue);
  }

  onLikeClicked(cnt) {
    this.tweet.likesCount = cnt;
    console.log("Like was clicked: "+ cnt + " times");
  }
}
