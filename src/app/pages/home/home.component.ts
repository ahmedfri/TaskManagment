import { Component, OnInit, ViewChild,NgZone} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employees } from 'src/app/shared/models/employee';
import { ServicesService } from 'src/app/shared/services/services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild("contentEdit")contentEdit:any;
   UaserDataAll:any
   selectedCar: any;
   DataTask:any;
   DataEditTask:any;
   getAllTask:any;
   dataEdit:any;
  //  dataUaserName:Employees[]=[];
  constructor(private route: Router,private service:ServicesService, private modelService:NgbModal,private zone:NgZone) { }

  ngOnInit(): void {
    this.GetAllEmp();
    this.getTaskById();
  }
  AddTask = new FormGroup({
    userId: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required)
  });
  EditTasks = new FormGroup({
    id: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required)
  });
  openEdit(data:any){
    this.dataEdit =data
    this.modelService.open(this.contentEdit ,
      {
        centered:true
      });
   this.setEditData(this.dataEdit);
  }
  GetAllEmp(){
    this.service.GetAllEmp().subscribe(
      (Response: any)=>{
        this.UaserDataAll = Response;
        console.log(this.UaserDataAll)
      },
      (err:any)=>{
        console.log(err);
      }
    )
  }
  AddTaskPost(){
    console.log(this.AddTask.value.userId);
    this.service.CreateTask(this.AddTask.value).subscribe(
      (Response: any)=>{
        this.DataTask = Response;
        console.log(this.DataTask)
      },
      (err:any)=>{
        console.log(err);
      },
      ()=>{
        Swal.fire({
          icon: 'success',
          title: 'Task Created And Assigned',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }
  getTaskById(){
    this.service.getAllTasks().subscribe(
      (Response: any)=>{
        this.getAllTask = Response.data;
        console.log(this.getAllTask);
      },
      (err:any)=>{
        console.log(err);
      }
    )
  }
  EditTask(){
        this.service.EditTask(this.EditTasks.value).subscribe(
      (Response: any)=>{
        this.DataEditTask = Response;
        console.log(this.DataEditTask);
        this.GetAllEmp();
       
      },
      (err:any)=>{
        console.log(err);
      },
      ()=>{
        this.zone.run(() => { this.modelService.dismissAll();
          this.GetAllEmp();
        });
        Swal.fire({
          icon: 'success',
          title: 'Task Updated',
          showConfirmButton: false,
          timer: 1500
        })
      
        
      }
    )
  }
  deleteTask(data:any){
    console.log(data)
    this.service.deleteTask(data).subscribe(
      (Response: any)=>{
        console.log(Response)
      },
      (err:any)=>{
        console.log(err);
      },
      ()=>{
        Swal.fire({
          //position: 'top-end',
          icon: 'success',
          title: 'Task Deleted',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }
  setEditData(dataEdit:any){
    console.log('dataEdit' , dataEdit)
    this.EditTasks.controls["id"].setValue(dataEdit.id)
    this.EditTasks.controls["description"].setValue(dataEdit.description)
    this.EditTasks.controls["name"].setValue(dataEdit.name)
  }
}