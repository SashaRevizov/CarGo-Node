import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/assets/services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  title = 'CarGo';
  constructor(private auth: AuthService){

  }
  ngOnInit(){
    const potrntialToken = localStorage.getItem('auth-token')
    if (potrntialToken !== null){
      this.auth.setToken(potrntialToken)
    }
 
    

  }
}



