import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl="http://localhost:8080"

  constructor(private http: HttpClient) { }

  public  getAllEmployee(){
    return this.http.get(`${this.baseUrl}/admin/getAllEmployees`);
  }

  
  
  public  getInActiveEmployees(){
    return this.http.get(`${this.baseUrl}/admin/getInActiveEmployees`);
  }

  public createEmployee(employee: any){

    return this.http.post('http://localhost:8080/admin/addEmployee',employee);

  }

  public deleteEmployee(id: any){

    return this.http.delete('http://localhost:8080/admin/deleteEmployee/'+id);

   }

   public  getAllworkDays(){
    return this.http.get(`${this.baseUrl}/workdays/getAllWorkdays`);
  }

  public getOneEmployee(id: any){
    return this.http.get('http://localhost:8080/admin/getOneEmployee/'+id);

  }

  public undoDelete(id: any){
    return this.http.get('http://localhost:8080/admin/undoDelete/'+id);

  }
  public updateEmployee(updateemployee: any){
    return this.http.put('http://localhost:8080/admin/updateEmployee',updateemployee);
  }

  public createpayslip(timefrom:any,timeto:any){
    
    return this.http.get(`http://localhost:8080/admin/createPayslips?timefrom=${timefrom}&timeto=${timeto}`);
  }


  public getAllQueries(){
    return this.http.get(`http://localhost:8080/support/getAllContactQuestions`);
  }

  public questionAnswers(questionAnswers: any){

    return this.http.put('http://localhost:8080/support/contactAnswers',questionAnswers);

  }
  
}
