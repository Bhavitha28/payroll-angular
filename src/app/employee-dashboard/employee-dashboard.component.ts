import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { ConfirmedValidator } from '../confirmed.validator';
import { EmployeeService } from '../services/employee.service';
import { LoginService } from '../services/Login.service';
import { UserService } from '../services/user.service';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';
import { empty } from 'rxjs';

import { Spinkit } from 'ng-http-loader';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  @ViewChild('content',{static:false}) el!:ElementRef
  spinnerStyle = Spinkit;
  displayEmployeeprofile = false;
  checkpassword: any;
  displayEmployeeForm = '';
  displayResetForm = false;
  token: any;
  newAdminData: any;
  username: any;
  employeeId: any;
  displayViewpayslip = false;
  payslipTable=false;
  help=false;
  questionAnswerList:any;
  form: FormGroup = new FormGroup({});

  paySlipData:any;
  contactUs=false;

  constructor(public employeeServices: EmployeeService, public loginService: LoginService, private fb: FormBuilder, private userService: UserService, private snack: MatSnackBar) {
    this.form = fb.group({
     
      password: ['', [Validators.required,

      Validators.minLength(8),

      Validators.maxLength(16),

      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),

      ]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }

  get f() {

    return this.form.controls;

  }

  ngOnInit(): void {
    this.clearOld();

    this.newAdminData = 'null';
    this.token = this.loginService.getToken();
    this.employeeId = this.loginService.getEmployeeId();
    this.username = localStorage.getItem('username');
    this.checkpassword = localStorage.getItem('password')
    console.log(this.token);
    if (this.token == undefined || this.token == '' || this.token == null) {
      console.log('token  not generated-dashboard');
    }
    else {
      console.log('token getting succfully in -dashboard');
      console.log(this.token);
    }


  }
  public updateAdmin = {
    employeeId: '',
    userName: '',
    employeeName: '',
    password: ''

  }

  public contact={
    issueType:'',
    subject:'',
    description:'',
    employeeId:''
  }

  public employee={
    employeeName: '',
    employeeId: '',
    employeeDoj:'',
    employeeType:'',
    grossSalary:'',
    mailId:''
  };

  public payslips = {
    empWorkId: '',
    epf: '',
    tax: '',
    leaveDeduction: '',
    his: '',
    netpay: '',
    basic: '',
    hra:''
  }
  public viewPayslip = {
    timefrom: '',
    timeto: ''
  };
  public ConfirmPassword = '';
  public password = '';
  public OldPassword = '';
  clearOld() {
    this.contactUs=false;
    this.help=false;
this.displayViewpayslip=false;
this.payslipTable=false;
    this.displayEmployeeForm = '';
    this.displayResetForm = false;
    this.displayEmployeeprofile = false;
    localStorage.removeItem('newAdmin');
  }

  public getUpdateAdmin(username: any) {

    // this.eid=this._router.snapshot.params['eid'];

    // alert(this.eid)



    this.loginService.getCurrentUser(username).subscribe(

      (data: any) => {

        this.updateAdmin = data;

        console.log(this.updateAdmin);

      },

      (error: any) => {

        console.log(error);

      }

    );

  }


  ViewPayslips() {
    this.clearOld();
    this.displayViewpayslip = true;
  }


  displayEmployee() {
    this.clearOld();
    this.displayEmployeeprofile = true;
  }


  SubmitTimefromTimeto() {
    this.clearOld();
    var tFrom = new Date(this.viewPayslip.timefrom);
    var tTo = new Date(this.viewPayslip.timefrom); //tFrom.setMonth(tFrom.getMonth()+1)
    tTo.setMonth(tFrom.getMonth() + 1);
    // var tTo = new Date(this.viewPayslip.timeto);

    this.employeeServices.viewPayslip(this.employeeId, tFrom.getTime(), tTo.getTime()).subscribe(
      (data: any) => {


        this.paySlipData = data.payslips;

        console.log(this.paySlipData);
        if (this.paySlipData.length > 0) {


          this.payslipTable = true;
          this.employeeServices.getOneEmployee(this.employeeId).subscribe(

            (data: any) => {

              this.employee = data;

              console.log(this.employee);

            },

            (error: any) => {

              console.log(error);

            }

          );
        } else {
          Swal.fire("payslip not available")
        }

      },
    )


  }

  displayResetPassword(username: any) {
    this.username = localStorage.getItem('userName');
    this.clearOld();
    this.getUpdateAdmin(username);
    this.displayResetForm = true;

  }

  updateResetformSubmit() {

    
      this.checkpassword = this.password;
      this.userService.updateAdmin(this.updateAdmin).subscribe(
        (data: any) => {
          Swal.fire('Success !!', 'Reset', 'success').then((e) => {
            this.clearOld();
          });
        }, (error) => {
          Swal.fire('Error !!', 'Error in updating', 'error');
          console.log(error);
        }
      )
      console.log(this.OldPassword)
    


  }

  // makepdf(){
  //   let  pdf=new jsPDF('p','pt','a4');
  //   pdf.html(this.el.nativeElement,{
  //     callback:(pdf)=>{
  //       pdf.save("payslip.pdf");
  //     }
  //   });
    

  // }

  public makepdf(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Payslip.pdf');
    });
  }


  viewHelp(){
    this.clearOld();
    this.help=true;
  }

  EmployeecontactUs(){
    this.questionAnswerList='';
    this.contactUs=true;
  }

  submitContact(){
    console.log(this.contact)
    this.contact.employeeId=this.employeeId;
    this.employeeServices.contacthelp(this.contact).subscribe(
      (data)=>{
        console.log(data);
        

      Swal.fire('Successfully done !!','issue submitted','success' );
      // window.location.reload();
      },
      (error)=>{
       console.log(error);
      // alert('someting went wrong');
      this.snack.open('Something Went wrong !!','',{
        duration:3000,
      })
      }
      );
  }

  viewRequestLog(){
 this.contactUs=false;
 
    this.employeeServices.getQuestionAnswers(this.employeeId).subscribe(

      queryList => {

        

        
        this.questionAnswerList = queryList;

        this.questionAnswerList = JSON.stringify(this.questionAnswerList);

        this.questionAnswerList = JSON.parse(this.questionAnswerList);


        console.log(this.questionAnswerList);

      },

      error => {

        console.log("error in query List Fetching ");

        console.log(error);

      }

    )

  }
}

