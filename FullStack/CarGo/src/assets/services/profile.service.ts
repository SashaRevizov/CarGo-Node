import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Transporter } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
constructor(private http: HttpClient) { }
fetch(): Observable<User>{
  return this.http.get<User>('http://localhost:8080/client/profile')
}
update(password: string):Observable<any>{
  return this.http.patch<any>('http://localhost:8080/client/profile', password)
}
updateTrans(pass: string):Observable<any>{
  return this.http.patch<any>('http://localhost:8080/transporter/profile', pass)
}
fetchTrans(): Observable<Transporter>{
  return this.http.get<Transporter>('http://localhost:8080/transporter/profile')
}
}
