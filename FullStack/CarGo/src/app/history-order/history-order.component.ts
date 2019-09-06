import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MaterialInstance, MaterialService } from 'src/assets/classes/material-service';
import { Order } from 'src/assets/interfaces';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CreateOrderService } from 'src/assets/services/createOrder.service';

@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.css']
})
export class HistoryOrderComponent implements OnInit {

  @ViewChild('modal') modalRef: ElementRef
  modal: MaterialInstance
  selectedOrder: Order
  order$: Observable<Order>
  
  constructor(private route: ActivatedRoute, private order: CreateOrderService) { }

  ngOnInit() {
    this.order$ = this.order.history()
  }

  ngOnDestroy(){
    this.modal.destroy()
  }
  ngAfterViewInit(){
    this.modal = MaterialService.initModal(this.modalRef)
  }
  selectOrder(order: Order){
    this.selectedOrder = order
    this.modal.open()
  }
  closeModal() {
    this.modal.close()
  }

}
