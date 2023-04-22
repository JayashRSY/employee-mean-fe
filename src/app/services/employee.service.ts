import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url = 'http://localhost:3000/emp-db/'

  constructor(private http: HttpClient) { }

  addEmp(emp: any) {
    return this.http.post(this.url, emp)
  }

  getEmpList() {
    return this.http.get(this.url)
  }

  updateEmp(emp: any) {
    return this.http.put(`${this.url}${emp._id}`, emp)
  }

  deleteEmp(id: any) {
    return this.http.delete(`${this.url}${id}`)
  }

}
