import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MaterialInstance, MaterialService } from 'src/assets/classes/material-service';
import { Order } from 'src/assets/interfaces';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrderService } from 'src/assets/services/createOrder.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-orders-transporter',
  templateUrl: './orders-transporter.component.html',
  styleUrls: ['./orders-transporter.component.css']
})
export class OrdersTransporterComponent implements OnInit {

  @ViewChild('modal') modalRef: ElementRef
  modal: MaterialInstance
  selectedOrder: Order
  order$: Observable<Order>
  form: FormGroup
  selectedID:string
  constructor(private router: Router, private route: ActivatedRoute, private order: CreateOrderService) { }

  ngOnInit() {
    this.form = new FormGroup({
      price: new FormControl(null, [Validators.required, Validators.min(50)])
    })
    this.order$ = this.order.findActiveTrans()
  }

  ngOnDestroy(){
    this.modal.destroy()
  }
  ngAfterViewInit(){
    this.modal = MaterialService.initModal(this.modalRef)
  }
  selectOrder(order: Order){
    
    this.selectedOrder = order
    this.selectedID = order._id
    this.modal.open()
  }
  closeModal() {
    this.modal.close()
  }
  onSubmit(){
    this.selectedOrder.price = this.form.value.price + " грн."
    return this.order.accessTrans(this.selectedOrder).subscribe(
      ()=> {
        this.router.navigate(['/transporter/activeOrder'], {
          queryParams: {
            access: true
          }
        })
      },
      error => {
          MaterialService.toast(error.error.message)
      }
    )
  }
}
