import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  medicineId!: any;
  medicineDetail :any;
  imageUrl!: string;
  constructor(private router: Router,private route: ActivatedRoute,private apiService:ApiService) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.medicineId = params?.get('medicineId');      
    });

    this.apiService.getProductDetail(this.medicineId).subscribe({
      next:(res)=>{
      this.medicineDetail = res?.data;
      this.imageUrl = res?.data?.thumb_medicine_image;
      }
    })
  }

  placeOrder() {  
    this.router.navigate(['/PlaceOrder', this.medicineId]);
  }
}
