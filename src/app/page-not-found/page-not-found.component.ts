import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.less']
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }
  jumpAround () {
    $('h1').animate({
        width: 'toggle',
        height: 'toggle'
      }, {
        duration: 1000,
        complete: function() {
        $( this ).after( '<div>Page does not exist!</div>' );
        }
      });
    }
  ngOnInit() {
  }

}
