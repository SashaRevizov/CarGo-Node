import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/assets/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialService } from 'src/assets/classes/material-service';

@Component({
  selector: 'app-refresh-client',
  templateUrl: './refresh-client.component.html',
  styleUrls: ['./refresh-client.component.css']
})
export class RefreshClientComponent implements OnInit {

  form: FormGroup
  aSub: Subscription
  constructor(private auth:AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    })

  }

  ngOnDestroy(){
    if(this.aSub){
      this.aSub.unsubscribe()
    }
  }

  onSubmit(){
    this.aSub = this.auth.refreshClient(this.form.value).subscribe(
      ()=> {
        this.router.navigate(['/client'],{
          queryParams: {
              refresh: true
          }
      })
    },
      error => {
        MaterialService.toast(error.error.message)
      }
    )
  }
}
