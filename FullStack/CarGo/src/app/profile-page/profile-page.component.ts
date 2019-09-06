import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from 'src/assets/services/profile.service';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/assets/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterialService } from 'src/assets/classes/material-service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user$: Observable<User>
  form: FormGroup
  aSub: Subscription
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.form = new FormGroup({
      confirm: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]) 
    })

    this.user$ = this.profileService.fetch()

  }
  onSubmit(){
    this.aSub = this.profileService.update(this.form.value).subscribe(
      ()=>{MaterialService.toast('Пароль успішно зменено')}
    );
  }
}
