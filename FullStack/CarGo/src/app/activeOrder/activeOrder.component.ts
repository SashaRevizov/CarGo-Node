import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { CreateOrderService } from 'src/assets/services/createOrder.service';
import { Order, Transporter } from 'src/assets/interfaces';
import { Subscription, Observable } from 'rxjs';
import { Params, ActivatedRoute, Router } from '@angular/router';
import {MaterialInstance, MaterialService} from '../../assets/classes/material-service'
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-activeOrder',
  templateUrl: './activeOrder.component.html',
  styleUrls: ['./activeOrder.component.css']
})

  export class ActiveOrderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('modal') modalRef: ElementRef
  modal: MaterialInstance
  selectedOrder: Order
  order$: Observable<Order>
  transporter: Observable<Transporter>
  constructor(private route: ActivatedRoute,private router: Router, private order: CreateOrderService, private http: HttpClient) { }

  ngOnInit() {
    this.order$ = this.order.findActive()

  }

  ngOnDestroy(){
    this.modal.destroy()
  }
  ngAfterViewInit(){
    this.modal = MaterialService.initModal(this.modalRef)
  }

  selectOrder(order: Order ){
    this.selectedOrder = order
    this.modal.open()


  }
  closeModal() {
    this.modal.close()
  }
  discard(){
    return this.order.discard(this.selectedOrder).subscribe(
      ()=> {
        MaterialService.toast("Відмовлено")
        this.order$ = this.order.findActive()
        this.modal.close()
      },
      error => {
          MaterialService.toast(error.error.message)
      }
    )
  }
  allow(){
    return this.order.allow(this.selectedOrder).subscribe(
      ()=> {
        MaterialService.toast("Замовлення виконується")
        this.order$ = this.order.findActive()
        this.modal.close()
      },
      error => {
          MaterialService.toast(error.error.message)
      }
    )
  }
  end(){
    return this.order.end(this.selectedOrder).subscribe(
      ()=> {
        MaterialService.toast("Замовлення виконано")
        this.order$ = this.order.findActive()
        this.modal.close()
      },
      error => {
          MaterialService.toast(error.error.message)
      }
    )
  }
  delete() {
    const decision = window.confirm(`Ви дійсно хочете видалити замовлення №${this.selectedOrder.orderNum}`)

    if (decision) {
      this.order.deleteById(this.selectedOrder._id)
        .subscribe(
          () => {
          this.modal.close()
          this.order$ = this.order.findActive()
          MaterialService.toast("Замовлення видалено")
        },
          error => MaterialService.toast(error.error.message),

        )
    }
  }
}
