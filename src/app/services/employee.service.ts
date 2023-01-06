import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl="http://localhost:8080"
  constructor(private http: HttpClient) { }

  public viewPayslip(id:any,timefrom:any,timeto:any){
    
    return this.http.get(`http://localhost:8080/Employee/get-payslips/`+id+`?timefrom=${timefrom}&timeto=${timeto}`);
  }

  public getOneEmployee(id: any){
    return this.http.get('http://localhost:8080/Employee/getOneEmployee/'+id);

  }


  public contacthelp(contact: any){
    return this.http.post('http://localhost:8080/support/contact',contact);
  }
  
  public getQuestionAnswers(employeeId: any){
    return this.http.get('http://localhost:8080/support/findSupport/'+employeeId);

  }

  }
