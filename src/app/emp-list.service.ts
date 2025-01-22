import { Injectable } from '@angular/core';
import{ HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmpListService {

  constructor(private http:HttpClient) { }
getAll(){
    return this.http.get<Employee>('http://localhost:3000/empList');
  
}
AddEmployee(Employee : any): Observable<any>{
  return this.http.post('http://localhost:3000/empList', Employee);
}
UpdateEmployee(id: number, employee: any): Observable<any> {
  return this.http.put(`http://localhost:3000/empList/${id}`, employee);
}
DeleteEmployee(id: number): Observable<any> {
  return this.http.delete(`http://localhost:3000/empList/${id}`);

}
}