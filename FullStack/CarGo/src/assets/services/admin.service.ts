import { Injectable } from '@angular/core';
import { Order, User, Transporter } from '../interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

    orders():Observable<Order>{
      return this.http.get<Order>(`http://localhost:8080/admin/orders`)
    }
    deleteById(id: string):Observable<Order>{
      return this.http.delete<Order>(`http://localhost:8080/admin/orders/${id}`)
    }
    clients():Observable<User>{
      return this.http.get<User>(`http://localhost:8080/admin/clients`)
    }
    clientDel(id: string):Observable<User>{
      return this.http.delete<User>(`http://localhost:8080/admin/client/${id}`)
    }
    transporter():Observable<Transporter>{
      return this.http.get<Transporter>(`http://localhost:8080/admin/transporters`)
    }
    transporterDel(id: string):Observable<Transporter>{
      return this.http.delete<Transporter>(`http://localhost:8080/admin/transporter/${id}`)
    }
    allow(transporter: Transporter){
      return this.http.patch(`http://localhost:8080/admin/transporters`, transporter)
    }
}
