import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Order, City, Transporter } from '../interfaces';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CreateOrderService {

constructor(private http: HttpClient) { }

  create(order: Order): Observable<any> {
     return this.http.post<any>('http://localhost:8080/client/order', order)

  }
  city(): Observable<City>{
    return this.http.get<City>('http://localhost:8080/client/order')
  }

  findActive(){
    return this.http.get<Order>('http://localhost:8080/client/active_orders')
  }
  findInProgress(){
    return this.http.get<Order>('http://localhost:8080/transporter/active_orders')
  }

  findActiveTrans() {
    return this.http.get<Order>('http://localhost:8080/transporter/orders')
  }
  history(): Observable<Order>{

    return this.http.get<Order>('http://localhost:8080/client/history')

   }
   historyTrans(){
    return this.http.get<Order>('http://localhost:8080/transporter/history')
   }

   accessTrans(order: Order){

      return this.http.patch('http://localhost:8080/transporter/orders', order)
   }

   discard(order: Order){
    return this.http.patch(`http://localhost:8080/client/order`,order)
   }
   allow(order: Order){
    return this.http.patch(`http://localhost:8080/client/active_orders`,order)
   }
   end(order: Order){
    return this.http.patch(`http://localhost:8080/client/active_ordersEnd`,order)
   }
  deleteById(id: string):Observable<Order>{
    return this.http.delete<Order>(`http://localhost:8080/client/order/${id}`)
  }

}
