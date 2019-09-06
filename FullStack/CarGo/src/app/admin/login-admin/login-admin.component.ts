import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'src/assets/classes/material-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/assets/services/auth.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  form: FormGroup
  aSub: Subscription
  constructor(private auth:AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params: Params)=>{
      if(params['registered']) {
        MaterialService.toast("Тепер потрібно підтвердити пошту та увійти")
      } else if (params['accessDenied']) {
        MaterialService.toast("Спочатку авторизуйтесь")
      }else if (params['sessionFailed']) {
        MaterialService.toast("Авторизуйтесь")
      }
    })
  }

  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

  onSubmit(){
    
    this.aSub = this.auth.loginAdmin(this.form.value).subscribe(
      ()=> {
  
        this.router.navigate(['/admin/orders'])
    },
      error => {
        MaterialService.toast(error.error.message)
      }
    );
  }

}
