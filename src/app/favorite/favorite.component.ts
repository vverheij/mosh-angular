import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',

  styles: [
    `
  .glyphicon {
    color: green;
  }
  .glyphicon-star {
    background: black;
  }
    `
  ]
  //styleUrls: ['./favorite.component.css'],
  //encapsulation: ViewEncapsulation.Native
})
export class FavoriteComponent {
  @Input('isFavorite') isSelected: boolean;
  @Output('change') click = new EventEmitter();

  constructor() { }

  onClick() {
    this.isSelected = !this.isSelected;
    this.click.emit({ newValue: this.isSelected });
  }
}

export interface FavoriteChangedEventArgs{
  newValue: boolean;
}