import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private ServerURI = "http://localhost:5187/api/Resource/"

  constructor(private httpclient:HttpClient) { }

  getEmployeeDetailsById(empId:string){
    const endpoint = this.ServerURI+empId.toString();
    return this.httpclient.get(endpoint);
  }

  getAllEmployees(){
    const endpoint = this.ServerURI;
    return this.httpclient.get(endpoint)
  }

  addEmployeeeDetails(data:any){
    const endpoint = this.ServerURI ;
    console.log("Daa:", data);
    return this.httpclient.post(endpoint,data)
  }

  updateEmployeeDetails(empId:string,data:any){
    const endpoint = this.ServerURI ;
    const payload = {empId, ...data}
    return this.httpclient.put(endpoint,payload)
  }

  deleteEmployeeDetails(empId:string){
    const endpoint = this.ServerURI + empId.toString();
    return this.httpclient.delete(endpoint)
  }
}
