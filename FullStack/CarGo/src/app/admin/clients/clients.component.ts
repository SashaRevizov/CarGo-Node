import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MaterialInstance, MaterialService } from 'src/assets/classes/material-service';
import { Order, Transporter, User } from 'src/assets/interfaces';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/assets/services/admin.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  @ViewChild('modal') modalRef: ElementRef
  modal: MaterialInstance
  selectedUser: User
  users$: Observable<User>
  transporter: Observable<Transporter>
  constructor(private route: ActivatedRoute,private router: Router, private admin: AdminService, private http: HttpClient) { }

  ngOnInit() {
    this.users$ = this.admin.clients()

  }

  ngOnDestroy(){
    this.modal.destroy()
  }
  ngAfterViewInit(){
    this.modal = MaterialService.initModal(this.modalRef)
  }

  selectUser(user: User ){
    this.selectedUser = user
    this.modal.open()
  }
  closeModal() {
    this.modal.close()
  }

  delete() {
    const decision = window.confirm(`Ви дійсно хочете видалити користувача${this.selectedUser.name}`)

    if (decision) {
      this.admin.clientDel(this.selectedUser._id)
        .subscribe(
          () => {
          this.modal.close()
          this.users$ = this.admin.clients()
          MaterialService.toast("Замовника видалено")
        },
          error => MaterialService.toast(error.error.message),

        )
    }
  }


}
