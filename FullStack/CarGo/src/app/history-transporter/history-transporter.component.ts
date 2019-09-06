import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaterialInstance, MaterialService } from 'src/assets/classes/material-service';
import { CreateOrderService } from 'src/assets/services/createOrder.service';
import { Order } from 'src/assets/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-history-transporter',
  templateUrl: './history-transporter.component.html',
  styleUrls: ['./history-transporter.component.css']
})
export class HistoryTransporterComponent implements OnInit {

  @ViewChild('modal') modalRef: ElementRef
  modal: MaterialInstance
  selectedOrder: Order
  order$: Observable<Order>
  
  constructor(private route: ActivatedRoute, private order: CreateOrderService) { }

  ngOnInit() {
    this.order$ = this.order.historyTrans()
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
