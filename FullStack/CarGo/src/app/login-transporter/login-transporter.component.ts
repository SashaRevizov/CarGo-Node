import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/assets/classes/material-service';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/assets/services/auth.service';

@Component({
  selector: 'app-login-transporter',
  templateUrl: './login-transporter.component.html',
  styleUrls: ['./login-transporter.component.css']
})
export class LoginTransporterComponent implements OnInit {
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
        MaterialService.toast("Очікуйте підтвердження документів")
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
    
    this.aSub = this.auth.loginTransporter(this.form.value).subscribe(
      ()=> {
        this.router.navigate(['/transporter/profile'])
    },
      error => {
        MaterialService.toast(error.error.message)
      }
    );
  }
}
