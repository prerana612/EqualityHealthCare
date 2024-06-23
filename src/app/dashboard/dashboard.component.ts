import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  searchstring!: string;  // take dolo for demo 
  isSearchMedicine = false;
  medicines: any;
  constructor(private apiService: ApiService) { }


  searchMedicine() {
    this.apiService.searchMedicines(this.searchstring).subscribe(response => {
      this.medicines = response?.data?.result;
      this.isSearchMedicine = true;
    })
  }
}
