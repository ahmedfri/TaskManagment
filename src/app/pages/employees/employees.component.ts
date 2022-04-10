import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/Authentication/auth/auth.service';
import { ServicesService } from 'src/app/shared/services/services.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  getAllTask:any;
  Id:any;
  constructor(private route: Router,private service:ServicesService,private authService: AuthService) { }

  ngOnInit(): void {
    this.getTaskById();
   
    
  }

  getTaskById(){
    let a = this.authService.getCurrentUser();
    console.log(a.jti)
    this.service.getAllTasksBYID(a.jti).subscribe(
      (Response: any)=>{
        this.getAllTask = Response.data;
       
      },
      (err:any)=>{
        console.log(err);
      }
    )
  }
}
