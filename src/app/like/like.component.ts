import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent {
  @Input('likesCount') likes: number;
  @Input('isActive') active: boolean;
  //@Output('bla') onLiked = new EventEmitter();
  constructor() { }

  onClick() {
    
    this.likes += (this.active) ? -1 : 1;
    this.active = !this.active;
    //this.onLiked.emit(this.likes);
  }
}
