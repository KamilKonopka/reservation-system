import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.less']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router) { }
  jumpAround () {
    setInterval(function () {
      const h1 = $('h1');
    h1.animate({
      fontSize: '6em'

      }, {
        duration: 1000

      });
      h1.animate({
        fontSize: '3em'
        }, {
          duration: 1000
        });
    }, 1000);
  }
  ngOnInit() {
  }

}
