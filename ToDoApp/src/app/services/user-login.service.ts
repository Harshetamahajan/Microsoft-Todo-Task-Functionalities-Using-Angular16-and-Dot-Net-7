import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  private apiUrl = 'https://localhost:7023/api/User/signup';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }
  
  authinticateUser(userData: any): Observable<any> {
    console.log("data is"+userData.username+userData.password)
    const url='https://localhost:7023/api/User/login';
    return this.http.post<any>(url, userData);
  }
  
  getUserByEmail(email: string): Observable<any> {
    const url = `https://localhost:7044/api/UserSignups/GetUserByEmail/${email}`;

    // const url = `${this.apiUrl}/GetUserByEmail/${email}`;
    return this.http.get<any>(url);
  }
  
  updateUser(userId: number, updatedData: any): Observable<any> {
    const url = `https://localhost:7044/api/UserSignups/${userId}`;
    console.log("in service "+updatedData.gender)
    //const url = `${this.apiUrl}/${userId}`;
    return this.http.put<any>(url, updatedData);
  }

  getUserById(id :number): Observable<any> {
    const url = `https://localhost:7044/api/UserSignups/${id}`;

    // const url = `${this.apiUrl}/GetUserByEmail/${email}`;
    return this.http.get<any>(url);
  }

 

  
}