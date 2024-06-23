import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent {
  patientForm!: FormGroup;

  constructor(private fb: FormBuilder, private api: ApiService,private router: Router) {
    this.patientForm = this.fb.group({
      zipcode: ['', Validators.required],
      mobile: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: [''],
      dob: [''],
      gender: [''],
      blood_group: ['']
    });
  }
  onSubmit() {
    this.api.addPatient(this.patientForm.value).subscribe({
      next: (res) => {
        this.api.patientID.next( res?.data?.patient_id);
        if(res.status_code !== 0){
          this.router.navigate(['/dashboard']);
        }
        else{
          console.log(res.status_message)
        }
      }
    })
  }
}
