import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Options } from 'ng5-slider';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { ServicesService } from 'src/app/shared/services/services.service';
import { AuthService } from 'src/app/shared/Authentication/auth/auth.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isShowRegisterPhone: boolean = false;
  isShowRegisterEmail: boolean = true;

  isShowStep1: boolean = true;
  isShowStep2: boolean = false;
  isShowStep3: boolean = false;
  public href: string = "";
  
  value: number = 0;
  options: Options = {
    floor: 0,
    ceil: 100,
    showSelectionBar: true
  };
  signinForm: FormGroup;
  constructor(
    private el: ElementRef,
    private route: Router ,
    private service :ServicesService,
    public fb: FormBuilder,
    public authService: AuthService,
    ) {
      this.signinForm = this.fb.group({
        username: [''],
        password: [''],
      });
     }

  ngOnInit(): void {
  }

  toggleShowRegisterPhone() {
    this.isShowRegisterEmail =!! this.isShowRegisterPhone;
    this.isShowRegisterPhone = true;
    this.isShowRegisterEmail = false;
    console.log("phone 1:" ,   this.isShowRegisterPhone);
    console.log("email 1:" ,   this.isShowRegisterEmail);
  }

  toggleShowRegisterEmail() {
    this.isShowRegisterPhone = false;
    this.isShowRegisterEmail = true;
    console.log("phone 2:" ,   this.isShowRegisterPhone);
    console.log("email 2:" ,   this.isShowRegisterEmail);
  }

  toggleWizerdStep1(){
    this.isShowStep1 = true;
    this.isShowStep2 = false;
    this.isShowStep3 = false;
    console.log("isShowStep 1:" ,   this.isShowStep1);
    console.log("isShowStep 2:" ,   this.isShowStep2);
    console.log("isShowStep 3:" ,   this.isShowStep3);
  }
  toggleWizerdStep2(){
    this.isShowStep1 = false;
    this.isShowStep2 = true ;
    this.isShowStep3 = false ;
    console.log("isShowStep 1:" ,   this.isShowStep1);
    console.log("isShowStep 2:" ,   this.isShowStep2);
    console.log("isShowStep 3:" ,   this.isShowStep3);
  }
  toggleWizerdStep3(){
    this.isShowStep1 = false;
    this.isShowStep2 = false ;
    this.isShowStep3 = true ;
    console.log("isShowStep 1:" ,   this.isShowStep1);
    console.log("isShowStep 2:" ,   this.isShowStep2);
    console.log("isShowStep 3:" ,   this.isShowStep3);
  }
  clicksing(){
    let myTag = this.el.nativeElement.querySelector(".cont").classList.toggle("s--signup"); 
  }
    navigateRout(){
    this.route.navigate([`/home/`]);
  }
  AddRegisterform = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    userType: new FormControl('0' , Validators.required),
    phoneNumer: new FormControl('', Validators.required)
  });
  get f(){
    return this.AddRegisterform.controls;
  }

  Registration(){
    console.log(this.AddRegisterform.value);
    this.service.CreateRegister(this.AddRegisterform.value).subscribe(
      (Respons: any) => {
        console.log(Respons);
      },
      (error) => {
        console.log(error);
      },
      () => {
         Swal.fire({
          //position: 'top-end',
          icon: 'success',
          title: 'Account Created',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )

  }

  loginUser() {
    this.authService.signIn(this.signinForm.value);
  }
}