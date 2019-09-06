
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import {LoginClientComponent} from './login-client/login-client.component'
import { AuthComponent } from './layouts/auth/auth.component';
import { SiteComponent } from './layouts/site/site.component';
import { HomeComponent } from './home/home.component';
import { RegClientComponent } from './reg-client/reg-client.component';
import { AuthGuard } from 'src/assets/classes/Auth-Guard';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { ActiveOrderComponent } from './activeOrder/activeOrder.component';
import { HistoryOrderComponent } from './history-order/history-order.component';

import { AboutComponent } from './about/about.component';
import { LoginTransporterComponent } from './login-transporter/login-transporter.component';
import { RegTransporterComponent } from './reg-transporter/reg-transporter.component';
import { AuthGuardTransporterService } from 'src/assets/classes/Auth-Guard-Transporter.service';
import { SiteTransporterComponent } from './layouts/site-transporter/site-transporter.component';
import { ProfileTransporterComponent } from './profile-transporter/profile-transporter.component';
import { ActiveTransporterComponent } from './active-transporter/active-transporter.component';
import { HistoryTransporterComponent } from './history-transporter/history-transporter.component';
import { OrdersTransporterComponent } from './orders-transporter/orders-transporter.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { TransportersComponent } from './admin/transporters/transporters.component';
import { ClientsComponent } from './admin/clients/clients.component';
import { RefreshClientComponent } from './refresh/refresh-client/refresh-client.component';

import { RefreshTransporterComponent } from './refresh/refresh-transporter/refresh-transporter.component';






const router: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {path: '', component: HomeComponent},
            {path: 'client', component: LoginClientComponent},
            {path: 'client/refresh', component: RefreshClientComponent},
            {path: 'transporter/refresh', component: RefreshTransporterComponent},
            {path: 'admin', component: LoginAdminComponent},
            {path: 'client/register', component: RegClientComponent},
            {path: 'transporter', component: LoginTransporterComponent},
            {path: 'transporter/register', component: RegTransporterComponent},
            {path: 'about', component: AboutComponent}

        ]
    },
    {
        path: 'client',  component: SiteComponent, canActivate: [AuthGuard], children: [
            {path: 'profile', component: ProfilePageComponent},
            {path: 'activeOrder', component: ActiveOrderComponent},
            {path: 'activeOrder/:id', component:  ActiveOrderComponent},
            {path: 'orderHistory', component: HistoryOrderComponent},
            {path: 'orderCreate', component: AddOrderComponent}

        ]
    },
    {
        path: 'transporter',  component: SiteTransporterComponent, canActivate: [AuthGuardTransporterService], children: [
            {path: 'profile', component: ProfileTransporterComponent},
            {path: 'activeOrder', component: ActiveTransporterComponent},
            {path: 'orderHistory', component: HistoryTransporterComponent},
            {path: 'orders', component: OrdersTransporterComponent}

        ]
    },
    {
        path: 'admin',  component: AdminComponent, canActivate: [AuthGuard], children: [
            {path: 'orders', component: OrdersComponent},
            {path: 'orders/:id', component: OrdersComponent},
            {path: 'transporters', component: TransportersComponent},
            {path: 'transporter/:id', component: TransportersComponent},
            {path: 'clients', component: ClientsComponent},
            {path: 'client/:id', component: ClientsComponent}

        ]
    }
]

@NgModule({
    imports: [ RouterModule.forRoot(router) ],
    exports: [RouterModule]
})
export class AppRoutingModule{

}