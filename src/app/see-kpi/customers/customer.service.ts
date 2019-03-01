import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { FunctionSetting } from '../../shared/functionSetting';

import { Customer } from "./customer.model";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  private customersUrl = "http://localhost:3000/customers";

  constructor(
    private http: HttpClient,
    private functionSetting: FunctionSetting
    ) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.functionSetting.API + '/customer/list');
  }

  getCustomerById(payload: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.functionSetting.API}/${payload}`);
  }

  createCustomer(payload: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.functionSetting.API, payload);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    return this.http.patch<Customer>(
      `${this.functionSetting.API}/${customer.id}`,
      customer
    );
  }

  deleteCustomer(payload: number) {
    return this.http.delete(`${this.customersUrl}/${payload}`);
  }
}
