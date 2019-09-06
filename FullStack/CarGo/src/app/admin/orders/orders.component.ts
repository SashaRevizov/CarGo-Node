import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MaterialService, MaterialInstance } from 'src/assets/classes/material-service';
import { Order, Transporter } from 'src/assets/interfaces';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateOrderService } from 'src/assets/services/createOrder.service';

import { AdminService } from 'src/assets/services/admin.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  @ViewChild('modal') modalRef: ElementRef
  modal: MaterialInstance
  selectedOrder: Order
  order$: Observable<Order>
  transporter: Observable<Transporter>
  constructor(private route: ActivatedRoute,private router: Router, private admin: AdminService, private http: HttpClient) { }

  ngOnInit() {
    this.order$ = this.admin.orders()

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

  delete() {
    const decision = window.confirm(`Ви дійсно хочете видалити замовлення №${this.selectedOrder.orderNum}`)

    if (decision) {
      this.admin.deleteById(this.selectedOrder._id)
        .subscribe(
          () => {
          this.modal.close()
          this.order$ = this.admin.orders()
          MaterialService.toast("Замовлення видалено")
        },
          error => MaterialService.toast(error.error.message),

        )
    }
  }

}
