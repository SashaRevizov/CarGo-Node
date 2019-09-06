import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginClientComponent } from './login-client/login-client.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { SiteComponent } from './layouts/site/site.component';
import { SiteTransporterComponent } from './layouts/site-transporter/site-transporter.component';
import { RegClientComponent } from './reg-client/reg-client.component';
import { HomeComponent } from './home/home.component';
import { TokenInterseptor } from 'src/assets/classes/token-interseptor.service';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { ActiveOrderComponent } from './activeOrder/activeOrder.component';
import { HistoryOrderComponent } from './history-order/history-order.component';
import { AboutComponent } from './about/about.component';

import { LoginTransporterComponent } from './login-transporter/login-transporter.component';
import { RegTransporterComponent } from './reg-transporter/reg-transporter.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
 
import { ProfileTransporterComponent } from './profile-transporter/profile-transporter.component';
import { HistoryTransporterComponent } from './history-transporter/history-transporter.component';
import { ActiveTransporterComponent } from './active-transporter/active-transporter.component';
import { OrdersTransporterComponent } from './orders-transporter/orders-transporter.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { ClientsComponent } from './admin/clients/clients.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { TransportersComponent } from './admin/transporters/transporters.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { RefreshClientComponent } from './refresh/refresh-client/refresh-client.component';
import { RefreshTransporterComponent } from './refresh/refresh-transporter/refresh-transporter.component';






@NgModule({
   declarations: [
      AppComponent,
      LoginClientComponent,
      RegClientComponent,
      AuthComponent,
      SiteComponent,
      RegClientComponent,
      HomeComponent,
      ProfilePageComponent,
      AddOrderComponent,
      ActiveOrderComponent,
      HistoryOrderComponent,
      AboutComponent,
      LoginTransporterComponent,
      RegTransporterComponent,
      ProfileTransporterComponent,
      SiteTransporterComponent,
      HistoryTransporterComponent,
      ActiveTransporterComponent,
      OrdersTransporterComponent,
      ActiveTransporterComponent,
      LoginAdminComponent,
      ClientsComponent,
      OrdersComponent,
      TransportersComponent,
      AdminComponent,
      RefreshClientComponent,
      RefreshTransporterComponent

   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      TextMaskModule,
      BrowserAnimationsModule,
      MatSelectModule,
      MatPaginatorModule
   ],
   providers: [
      {
         provide: HTTP_INTERCEPTORS,
         multi: true,
         useClass: TokenInterseptor
       }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
