import { Component, OnInit } from '@angular/core';
import { CreateOrderService } from 'src/assets/services/createOrder.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { MaterialService } from 'src/assets/classes/material-service';
import { City } from 'src/assets/interfaces';

declare var M
@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  aSub: Subscription
  form: FormGroup
  cities$: Observable<City>
  constructor(private order:CreateOrderService, private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit() {
   
    this.form = new FormGroup({
      startCity: new FormControl(null, [Validators.required]),
      endCity: new FormControl(null, [Validators.required]),
      startAdress: new FormControl(null, [Validators.required]),
      endAdress: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      length: new FormControl(null, [Validators.required,Validators.pattern(/[0-9]/)]),
      width: new FormControl(null, [Validators.required,Validators.pattern(/[0-9]/)]),
      dateEnd: new FormControl(null, [Validators.required]),
      dateStart: new FormControl(null, [Validators.required]),
      height: new FormControl(null, [Validators.required,Validators.pattern(/[0-9]/)]),
      weight: new FormControl(null, [Validators.required,Validators.pattern(/[0-9]/)]) 
    })
    this.cities$ = this.order.city()
    
  }



  onSubmit(){

    this.aSub = this.order.create(this.form.value).subscribe(
      ()=> {
        this.router.navigate(['/client/activeOrder']) 
        MaterialService.toast(`Замовлення було Створено.`)
        
    },
      error => {
        MaterialService.toast(error.error.message)
      }
    );
  }

}


