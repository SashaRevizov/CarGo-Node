import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/assets/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MaterialService } from 'src/assets/classes/material-service';

@Component({
  selector: 'app-refresh-transporter',
  templateUrl: './refresh-transporter.component.html',
  styleUrls: ['./refresh-transporter.component.css']
})
export class RefreshTransporterComponent implements OnInit {

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
    this.aSub = this.auth.refreshTransporter(this.form.value).subscribe(
      ()=> {
        this.router.navigate(['/transporter'],{
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
