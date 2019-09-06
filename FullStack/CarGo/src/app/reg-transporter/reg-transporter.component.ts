import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/assets/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterialService } from 'src/assets/classes/material-service';

@Component({
  selector: 'app-reg-transporter',
  templateUrl: './reg-transporter.component.html',
  styleUrls: ['./reg-transporter.component.css']
})
export class RegTransporterComponent implements OnInit {
  @ViewChild('input') inputRef: ElementRef
  
  mask: any[] = ['+', '3','8', ' ', '(', /[0-9]/, /\d/, /\d/, ')', '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  form: FormGroup
  image: File
  aSub: Subscription
  imagePreview = ''
  constructor(private auth:AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      image: new FormControl(null),
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
  triggerClick() {
    this.inputRef.nativeElement.click()
  }
  onSubmit(){
    return this.auth.registerTransporter(this.form.value.name, this.form.value.surname,this.form.value.email, this.form.value.phone,this.form.value.password, this.image).subscribe(
      ()=> {
        this.router.navigate(['/transporter'], {
          queryParams: {
            registered: true
          }
        })
      },
      error => {
          MaterialService.toast(error.error.message)
      }
    )
  }
  
  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file
    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result as string
    }
    reader.readAsDataURL(file)
  }

}
