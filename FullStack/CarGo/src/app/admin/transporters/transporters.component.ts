import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MaterialService, MaterialInstance } from 'src/assets/classes/material-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User, Transporter } from 'src/assets/interfaces';
import { AdminService } from 'src/assets/services/admin.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transporters',
  templateUrl: './transporters.component.html',
  styleUrls: ['./transporters.component.css']
})
export class TransportersComponent implements OnInit {

  @ViewChild('modal') modalRef: ElementRef
  modal: MaterialInstance
  selectedUser: Transporter
  users$: Observable<Transporter>
  image: File
  aSub: Subscription
  imagePreview = ''
  constructor(private route: ActivatedRoute,private router: Router, private admin: AdminService, private http: HttpClient) { }

  ngOnInit() {
    this.users$ = this.admin.transporter()

  }

  ngOnDestroy(){
    this.modal.destroy()
  }
  ngAfterViewInit(){
    this.modal = MaterialService.initModal(this.modalRef)
  }

  selectUser(user: Transporter){
    this.selectedUser = user
    this.imagePreview = this.selectedUser.document
    this.modal.open()
  }
  closeModal() {
    this.modal.close()
  }

  allow(){
    return this.admin.allow(this.selectedUser).subscribe(
      ()=> {
        MaterialService.toast("Перевізник підтверджен")
        this.users$ = this.admin.transporter()
        this.modal.close()
      },

    )
  }

  delete() {
    const decision = window.confirm(`Ви дійсно хочете видалити перевізника${this.selectedUser.name}`)

    if (decision) {
      this.admin.transporterDel(this.selectedUser._id)
        .subscribe(
          () => {
          this.modal.close()
          this.users$ = this.admin.transporter()
          MaterialService.toast("Перевізника видалено")
        },
          error => MaterialService.toast(error.error.message),

        )
    }
  }
}
