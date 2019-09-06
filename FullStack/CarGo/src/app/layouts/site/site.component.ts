import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MaterialInstance, MaterialService } from 'src/assets/classes/material-service';
import { AuthService } from 'src/assets/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) { }
 

  ngOnInit() {
  }
  

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/client'])
  }

}
