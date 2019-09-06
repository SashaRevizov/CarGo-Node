import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/assets/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialService } from 'src/assets/classes/material-service';

@Component({
  selector: 'app-reg-client',
  templateUrl: './reg-client.component.html',
  styleUrls: ['./reg-client.component.css']
})
export class RegClientComponent implements OnInit {
  mask: any[] = ['+', '3','8', ' ', '(', /[0-9]/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  form: FormGroup
  aSub: Subscription
  constructor(private auth:AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirm: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern(/[A-zА-я]/)]), 
      surname: new FormControl(null, [Validators.required,Validators.minLength(3), Validators.pattern(/[A-zА-я]/)]),
      phone: new FormControl(null, [Validators.required]) 
    })

  }


  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

  onSubmit(){
  
    this.aSub = this.auth.register(this.form.value).subscribe(
      ()=> {
        this.router.navigate(['/client'], {
          queryParams: {
            registered: true
          }
        })
      },
      error => {
          MaterialService.toast(error.error.message)
      }
    );
  }

}
