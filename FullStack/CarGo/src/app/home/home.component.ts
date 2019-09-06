import { Component, OnInit } from '@angular/core';
import * as jquery from 'jquery';
declare var M

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    $(document).ready(()=>{
      $('.arrow-btn').click(function(){
      $("html, body").animate({ scrollTop: 971 }, "slow");
      return false;
      });
      
    });

   
  }

  

}
