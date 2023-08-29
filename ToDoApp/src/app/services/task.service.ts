import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  getCompletedTasksForUser(USER_ID: any) {
    throw new Error('Method not implemented.');
  }
  getImportantTasksForUser(USER_ID: any) {
    throw new Error('Method not implemented.');
  }
  getPendingTasksForUser(USER_ID: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://localhost:7023';

  constructor(private http: HttpClient) {}

  createTask(task: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/task`, task);
  }


  updateTask(taskId: number, task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/task/${taskId}`, task);
  }

  setReminder(reminder :any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/Reminder`, reminder);
  }
  

  markCompleted(taskId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/task/${taskId}/markcompleted`, null);
  }

  markPending(taskId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/task/${taskId}/markpending`, null);
  }

  markImportant(taskId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/task/${taskId}/markimportant`, null);
  }
//https://localhost:7023/api/Task/user/1
  getTasksForUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/Task/user/${userId}`);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/task/${taskId}`);
  }
}