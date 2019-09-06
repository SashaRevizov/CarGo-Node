import { Injectable } from '@angular/core';
import { User, Transporter, Admin } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { tokenKey } from '@angular/core/src/view';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = null
  constructor(private http: HttpClient){}

  register(user: User): Observable<User>{

    return this.http.post<User>('http://localhost:8080/client/register', user)

  }
  registerTransporter(name: string, surname: string, email: string, phone: string, password: string, image: File): Observable<Transporter>{
    const fd = new FormData()

    fd.append('image', image)
    fd.append('name', name)
    fd.append('surname', surname)
    fd.append('email',email)
    fd.append('password',password)
    fd.append('phone', phone)

    return this.http.post<Transporter>('http://localhost:8080/transporter/register', fd)

  }
  login(user: User): Observable<{token: string}>{
    return this.http.post<{token: string}>('http://localhost:8080/client/login', user)
    .pipe(tap(
      ({token}) => {
        localStorage.setItem('auth-token', token)
        this.setToken(token)
      }
    ))

  }
  refreshClient(user: User):Observable<User>{
    return this.http.post<User>('http://localhost:8080/client/login/refresh', user)
  }
  refreshTransporter(user: Transporter):Observable<Transporter>{
    return this.http.post<Transporter>('http://localhost:8080/transporter/login/refresh', user)
  }
  loginTransporter(transporter: Transporter): Observable<{token: string}>{
    return this.http.post<{token: string}>('http://localhost:8080/transporter/login', transporter)
    .pipe(tap(
      ({token}) => {
        localStorage.setItem('auth-token', token)
        this.setToken(token)
      }
    ))

  }
  loginAdmin(admin: Admin): Observable<{token: string}>{
    return this.http.post<{token: string}>('http://localhost:8080/admin/login', admin)
    .pipe(tap(
      ({token}) => {
        localStorage.setItem('auth-token', token)
        this.setToken(token)
      }
    ))

  }
  setToken(token: string){
    this.token = token
  }
  getToken():string{
    return this.token
  }

  isAuth():boolean{
   return !!this.token
  }

  logout(){
    this.setToken(null)
    localStorage.clear()
  }
}
