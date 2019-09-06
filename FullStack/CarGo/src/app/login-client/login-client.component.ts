import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/assets/services/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialService } from 'src/assets/classes/material-service';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription
  constructor(private auth:AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]) 
    })

    this.route.queryParams.subscribe((params: Params)=>{
      if(params['registered']) {
        MaterialService.toast("Тепер потрібно підтвердити пошту та увійти")
      } else if (params['accessDenied']) {
        MaterialService.toast("Спочатку авторизуйтесь")
      }else if (params['sessionFailed']) {
        MaterialService.toast("Авторизуйтесь")
      }else if (params['refresh']) {
        MaterialService.toast("Перевірте пошту")
      }
    })
  }

  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

  onSubmit(){
    
    this.aSub = this.auth.login(this.form.value).subscribe(
      ()=> {
  
        this.router.navigate(['/client/profile'])
    },
      error => {
        MaterialService.toast(error.error.message)
      }
    );
  }

}
