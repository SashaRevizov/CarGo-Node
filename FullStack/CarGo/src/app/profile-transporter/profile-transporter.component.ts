import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Transporter } from 'src/assets/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from 'src/assets/services/profile.service';
import { MaterialService } from 'src/assets/classes/material-service';

@Component({
  selector: 'app-profile-transporter',
  templateUrl: './profile-transporter.component.html',
  styleUrls: ['./profile-transporter.component.css']
})
export class ProfileTransporterComponent implements OnInit {

  transporter$: Observable<Transporter>
  formTransporter: FormGroup
  aSub: Subscription
  constructor(private profile: ProfileService) { }

  ngOnInit() {
    this.formTransporter = new FormGroup({
      confirm: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]) 
    })

    this.transporter$ = this.profile.fetchTrans()

  }
  onSubmit(){
    this.aSub = this.profile.updateTrans(this.formTransporter.value).subscribe(
      ()=>{MaterialService.toast('Пароль успішно зменено')}
    );
  }
}
