import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientComponent } from './patient/patient.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PlaceOrderComponent } from './place-order/place-order.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'landingPage', component: LandingComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'patient-form', component: PatientComponent },
  { path: 'checkout/:medicineId', component: CheckoutComponent },
  {path:'PlaceOrder/:medicineId',component:PlaceOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
