import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/assets/services/auth.service';
import { Router } from '@angular/router';
import { MaterialInstance, MaterialService } from 'src/assets/classes/material-service';

@Component({
  selector: 'app-site-transporter',
  templateUrl: './site-transporter.component.html',
  styleUrls: ['./site-transporter.component.css']
})
export class SiteTransporterComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) { }
  
  

  ngOnInit() {
  }
  
  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/transporter'])
  }
}
