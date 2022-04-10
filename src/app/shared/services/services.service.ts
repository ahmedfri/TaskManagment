import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { registration } from '../models/registration';
import { AddTask } from '../models/AddTask';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiUrl = 'http://ahmedosm-001-site1.dtempurl.com/api/';
  // private apiUrl = 'https://localhost:7043/api/';
  
  ApiRoutes = {
    registerRoute: {
      register: 'ApplicationUser/register'
    },
    user :{
      userall: 'ApplicationUser/getAllEmployees'
    },
    AddTask:{
      add:'Task/AddTask',
      GetAll:'Task/getAllTasks',
      GetById:'Task/getTasksDetailsByUserId?UserId=',
      edit:'Task/EditTask',
      delete:'Task/DeleteTask?id=',
   
    }
  
  };
  
  constructor(public http: HttpClient) { }

  CreateRegister(data: registration) {
    return this.http.post(this.apiUrl + this.ApiRoutes.registerRoute.register, data)
  }
  GetAllEmp() {
    return this.http.get(this.apiUrl + this.ApiRoutes.user.userall );
  }
  CreateTask(dataTask:AddTask){
    return this.http.post(this.apiUrl + this.ApiRoutes.AddTask.add , dataTask );
  }
  getAllTasks() {
    return this.http.get(this.apiUrl + this.ApiRoutes.AddTask.GetAll  );
  }
  getAllTasksBYID(UserId:any) {
    return this.http.get(this.apiUrl + this.ApiRoutes.AddTask.GetById+UserId);
  }
  EditTask(dataTask:AddTask){
    return this.http.post(this.apiUrl + this.ApiRoutes.AddTask.edit , dataTask );
  }
  deleteTask(id:any){
    return this.http.get(this.apiUrl + this.ApiRoutes.AddTask.delete+id);
  }
}
