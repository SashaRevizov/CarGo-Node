import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(()=>{
      $('#show').click(()=>{
          $('.information').addClass('opened')
          $('#close').show()
          $('#show').hide()
      })
      $('#close').click(()=>{
        $('.information').removeClass('opened')
        $('#close').hide()
        $('#show').show()
    })
  })
    
  }
}

