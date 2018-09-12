import { CoursesService } from '../courses.service';
import { Component, OnInit } from '@angular/core';
//<button class="btn btn-primary" [class.active]="isActive">Save</button>
//<input (keyup)="onKeyUp($event)"/>
//<input (keyup.enter)="onKeyUp($event)"/>
//<input #email (keyup.enter)="onKeyUp(email.value)"/> // passing a param but only one way
//<input [value]="email" (keyup.enter)="email = $event.target.value; onKeyUp()"/> // oo way, two way property binding
//<input [(ngModel)]="email" (keyup.enter)="onKeyUp()"/> // using angular directive does the same as above but results in cleaner code
//<input [(ngModel)]="email" (keyup.enter)="onKeyUp()"/>

@Component({
  selector: 'courses',
  template: `
  <h1 [textContent]="title"></h1>
  <div (click) ="onDivClicked()">
    <button [style.backgroundColor] = "isActive ? 'blue' : 'white'" (click)="onSave($event)" >Save</button>
    <input [(ngModel)]="email" (keyup.enter)="onKeyUp()"/><br/>
    {{course.title | uppercase}}<br/>
    {{course.students | number}}<br/>
    {{course.rating | number:'1.2-2'}}<br/>
    {{course.price | currency:'USD'}}<br/>
    {{course.releaseDate | date:'shortDate'}}<br/>
    {{course.description | summary:10}}
   </div>
  `
})
export class CoursesComponent {
  title = 'List of courses';
  imageUrl = 'http://lorempixel.com/400/200';
  courses;
  isActive = false; 
  email = "me@example.com";
  constructor(service: CoursesService) {
      this.courses = service.getCourses();
  }
  onSave($event) {
    $event.stopPropagation();
    console.log("button was clicked",$event);
    this.isActive = !this.isActive;
  }
  onDivClicked() {
    console.log("Div was clicked");
  }
  // onKeyUp($event){
  //   console.log($event.target.value);
  // }
  onKeyUp(){
    console.log(this.email);
    //console.log("E");
  }
  course = {
    title: "The complete angular course",
    rating: 4.9745,
    students: 30123,
    price : 190.95,
    releaseDate: new Date(2016,3,1),
    description: 'this is a very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very, very long text'
  }  
}


