import { ApiService } from './../api.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { addressValidator } from '../../Validator/adressValidator';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent {
  orderForm: FormGroup;
  medicineId: any;
  orderedSuccessfully = false;
  orderResponse:any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private apiService: ApiService) {
    this.orderForm = this.fb.group({
      patient_id: [''],
      quantity: ['', Validators.required],
      delivery_type: ['', Validators.required],
      address: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      mobile: [''],
      patient_name: [''],
      latitude: [''],
      longitude: [''],
      full_address: ['']
    }, { validators: addressValidator() });

    this.orderForm.get('delivery_type')?.valueChanges.subscribe(value => {
      const addressControl = this.orderForm.get('address');
      const zipcodeControl = this.orderForm.get('zipcode');
      if (value === 'delivery') {
        addressControl?.setValidators([Validators.required]);
        zipcodeControl?.setValidators([]);
      } else if (value === 'pickup') {
        addressControl?.setValidators([]);
        zipcodeControl?.setValidators([Validators.required]);
      }
      addressControl?.updateValueAndValidity();
      zipcodeControl?.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    // this.medicineId ="X1P9/F3XVunOtftRNNCyHA==" //temp
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.medicineId = params.get('medicineId');
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      this.apiService.placeOrder(this.orderForm.value, this.medicineId).subscribe({
        next: (res) => {
          this.orderResponse = res;
          if(res.status_message === "Order placed successfully"){
            this.orderedSuccessfully = true;
          }
          else{
            alert(res?.status_message);
          }
        }
      })
    } else {
      alert("Form is invalid");
    }
  }
}
