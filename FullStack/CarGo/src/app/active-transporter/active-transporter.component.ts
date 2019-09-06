import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { MaterialService, MaterialInstance } from 'src/assets/classes/material-service';
import { Order, Transporter } from 'src/assets/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateOrderService } from 'src/assets/services/createOrder.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-active-transporter',
  templateUrl: './active-transporter.component.html',
  styleUrls: ['./active-transporter.component.css']
})
export class ActiveTransporterComponent implements OnInit {

  @ViewChild('modal') modalRef: ElementRef
  modal: MaterialInstance
  selectedOrder: Order
  order$: Observable<Order>
  transporter: Observable<Transporter>
  constructor(private route: ActivatedRoute,private router: Router, private order: CreateOrderService, private http: HttpClient) { }

  ngOnInit() {
    this.order$ = this.order.findInProgress()

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
}
