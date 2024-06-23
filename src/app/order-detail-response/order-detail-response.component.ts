import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-detail-response',
  templateUrl: './order-detail-response.component.html',
  styleUrl: './order-detail-response.component.css'
})
export class OrderDetailResponseComponent {
  @Input()
  orderResponse!: any;
  constructor(private route: Router) { }
  goToLandingPage() {
    this.route.navigate(['/dashboard'])
  }
}
