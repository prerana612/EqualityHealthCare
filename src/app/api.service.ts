import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://dev-api.evitalrx.in/v1/fulfillment/';
  private apiKey = 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3';
  patientID = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }

  searchMedicines(searchingstring: string): Observable<any> {
    const url = `${this.apiUrl}medicines/search`;

    const formData = new HttpParams()
      .set('apikey', this.apiKey)
      .set('searchstring', searchingstring);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(url, formData.toString(), { headers: headers });
  }

  getProductDetail(medicine_id: any): Observable<any> {
    const url = `${this.apiUrl}medicines/view`;
    const formData = new HttpParams()
      .set('apikey', this.apiKey)
      .set('medicine_id', medicine_id);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post<any>(url, formData.toString(), { headers: headers });
  }

  addPatient(patientData: any): Observable<any> {
    const url = `${this.apiUrl}patients/add`

    let formData = new HttpParams()
      .set('apikey', this.apiKey)
      .set('first_name', patientData.first_name)
      .set('mobile', patientData.mobile)
      .set('last_name', patientData.last_name)
    
      if (patientData.zipcode !== '') {
        formData = formData.set('zipcode', patientData.zipcode);
      }
      if (patientData.dob !== '') {
        formData = formData.set('dob', patientData.dob);
      }
      if (patientData.gender !== '') {
        formData = formData.set('gender', patientData.gender);
      }
      if (patientData.blood_group !== '') {
        formData = formData.set('blood_group', patientData.blood_group);
      }
      
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(url, formData.toString(), { headers: headers });
  }

  getPatient(patient_id: any): Observable<any> {
    const url = `${this.apiUrl}patients/view`;
    const formData = new HttpParams()
      .set('apikey', this.apiKey)
      .set('patient_id', patient_id);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(url, formData.toString(), { headers: headers });
  }

  placeOrder(orderDetails: any, medicineId: any): Observable<any> {
    const url = `${this.apiUrl}orders/place_order`;
    let formData = new HttpParams()
      .set('apikey', this.apiKey)
      .set('patient_id', this.patientID.value)
      .set('items', JSON.stringify([{ "medicine_id": medicineId, "quantity": orderDetails.quantity }]))
      .set('delivery_type', orderDetails.delivery_type)
      .set('patient_name', orderDetails.patient_name)
      .set('mobile', orderDetails.mobile)
      .set('city', orderDetails.city)
      .set('state', orderDetails.state)
      .set('zipcode', orderDetails.zipcode)
    // Add address only if delivery_type is 'delivery'
    if (orderDetails.delivery_type === 'delivery') {
      formData = formData.set('address', orderDetails.address);
    }

    if (orderDetails.latitude === "" || orderDetails.longitude === "") {
      formData = formData.set('full_address', orderDetails.full_address);
    }
    else {
      formData = formData.set('latitude', orderDetails.latitude)
        .set('longitude', orderDetails.longitude)
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(url, formData.toString(), { headers: headers });
  }


  login(mobile: string, firstname: string, lastname: string): Observable<any> {
    const url = `${this.apiUrl}login/signup`;
    const body = {
      apikey: this.apiKey,
      mobile: mobile,
      firstname: firstname,
      lastname: lastname
    };
    return this.http.post(url, body);
  }
}
