import { DatePipe, formatDate } from '@angular/common';
import { HttpEvent } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ConfirmedValidator } from '../confirmed.validator';
import { AdminService } from '../services/admin.service';
import { LoginService } from '../services/Login.service';
import { UploadService } from '../services/upload.service';
import { UserService } from '../services/user.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})


export class AdminDashboardComponent implements OnInit {


  page: number=1;
  count: number=0;
  tableSize: number=3;
  tableSizes:any=[3,5,10,15];
  form: FormGroup = new FormGroup({});
  username: any;
  checkpassword: any;
  EmployeeLists: any;

  token: any;
  newAdminData: any;
  deleteResult: any;
  displayFormCreation = '';
  displayFormUpdation = '';
  displayAdminForm = '';
  displayResetForm = false;
  displayError = false;
  displaycreatepayslip = false;
  displayuploadworkdays = false;
  displayAdminprofile = false;
  workDaysLists: any;

  queryLists: any;
  errorMsg: any;
  buttontoggleInActive=false;
  buttontoggleActive=false;
  isDescOrder:boolean=true;
  isDisplayAssist=false;
  orderHeader:any;
  
  EmpId:any;

  answer=false;
  // displayTimefromTimeTo='';
  searchInput:any={employeeId: { employeeId : ''}}

  EmployeesearchInput:any={ employeeId : ''}
  sort(headerName:String){

     this.isDescOrder=!this.isDescOrder;
  
    this.orderHeader=headerName;
  
   }
  constructor(public loginService: LoginService, private fb: FormBuilder, private userService: UserService, private router: Router, public uploadservice: UploadService, private adminServices: AdminService, private routelink: Router, private snack: MatSnackBar) {
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

 

  public contactAnswer={
    id:'',
    employeeId:'',
    subject:'',
    issueType:'',
    description:'',
    

  }
  public employee = {
    employeeName: '',
    employeeId: '',
    employeeDoj: '',
    employeeType: '',
    grossSalary: '',
    mailId: ''
  };
  public userFile: any = File;
  public createpayslip = {
    timefrom: '',
    timeto: ''
  };

  public ConfirmPassword = '';
  public password = '';
  public OldPassword = '';


  public updateemployee = {
    employeeName: '',
    employeeId: '',
    employeeDoj: '',
    employeeType: '',
    grossSalary: '',
    mailId: ''
  };



  public updateAdmin = {
    employeeId: '',
    userName: '',
    employeeName: '',
    password: ''

  }

  public questions={
    employeeId:'',
    issueType:'',
    subject:'',
    description:''

  }

  public supportAnswers={
answer:''
  }

  public questionAnswers={
    id:'',
    employeeId:'',
    issueType:'',
    subject:'',
    description:'',
    supportAnswers:[{
      answer:''
        }]
  }


  ngOnInit(): void {

    this.clearOld();
    this.displaycreatepayslip = false;
    this.newAdminData = 'null';
    this.token = this.loginService.getToken();

    this.username = localStorage.getItem('username');

    console.log(this.token);
    if (this.token == undefined || this.token == '' || this.token == null) {
      console.log('token  not generated-dashboard');
    }
    else {
      console.log('token getting succfully in -dashboard');
      console.log(this.token);
    }



  }
  fileform = new FormGroup({

    FILE: new FormControl("", [Validators.required])


  });
  get File() {

    return this.fileform.get("FILE") as FormControl;

  }
  registerform = new FormGroup({



    EMPLOYEENAME: new FormControl("", [

      Validators.required,

      Validators.minLength(3),

      Validators.pattern("[a-zA-Z].*")

    ]),

    EMPLOYEEDOJ: new FormControl("", [

      Validators.required,

    ]),

    EMPLOYEEID: new FormControl("", [

      Validators.required,


      Validators.pattern("[SG].[0-9]*")

    ]),



    EMPLOYEETYPE: new FormControl("", [

      Validators.required,
      Validators.pattern("[a-zA-Z].*")

    ]),




    // confirm_password: new FormControl(""),



    GROSSSALARY: new FormControl("", [

      Validators.required,

      Validators.pattern("[0-9]*"),


    ]),



    EMAIL: new FormControl("", [

      Validators.required,

      // Validators.pattern("[a-zA-Z0-9]*.(@gmail|@yahoo|@solugenix).com"),
      Validators.pattern("(?!.*[!#$%^&*()_+])[a-zA-Z0-9]*.(@gmail|@yahoo|@solugenix).com"),

    ]),

  });

  get employeeId() {

    return this.registerform.get("EMPLOYEEID") as FormControl;

  }

  get employeeName() {

    return this.registerform.get("EMPLOYEENAME") as FormControl;

  }

  get EmployeeType() {

    return this.registerform.get("EMPLOYEETYPE") as FormControl;

  }
  get EmployeeDoj() {

    return this.registerform.get("EMPLOYEEDOJ") as FormControl;

  }
  //  get Password(){

  //   return this.registerform.get("PASSWORD") as FormControl;

  //  }

  get GrossSalary() {

    return this.registerform.get("GROSSSALARY") as FormControl;

  }

  get Email() {

    return this.registerform.get("EMAIL") as FormControl;

  }




  public getUpdateEmployee(id: any) {

    // this.eid=this._router.snapshot.params['eid'];

    // alert(this.eid)



    this.adminServices.getOneEmployee(id).subscribe(

      (data: any) => {

        this.updateemployee = data;

        console.log(this.updateemployee);

      },

      (error: any) => {

        console.log(error);

      }

    );

  }

  clearOld() {
    this.EmployeeLists = '';
    this.displayFormCreation = '';
    this.displaycreatepayslip = false;
    this.displayuploadworkdays = false;
    this.workDaysLists = '';
    this.queryLists = '';
    this.errorMsg = '';
    this.displayFormUpdation = '';
    this.displayAdminForm = '';
    this.displayResetForm = false;
    this.displayAdminprofile = false;
    this.buttontoggleInActive=false;
    this.buttontoggleActive=false;
    localStorage.removeItem('newAdmin');
  }







  // employee List

  getAllEmployees() {

    this.clearOld();
this. buttontoggleInActive=true;
    this.deleteResult = '';

    this.adminServices.getAllEmployee().subscribe(

      employeeList => {

        this.EmployeeLists = employeeList;

        this.EmployeeLists = JSON.stringify(this.EmployeeLists);

        this.EmployeeLists = JSON.parse(this.EmployeeLists);

        console.log(this.EmployeeLists);

      },

      error => {

        console.log("error in Employee List Fetching ");

        console.log(error);

      }

    )

  }


  InactiveEmployeeList() {

    this.clearOld();
    this. buttontoggleActive=true;
    this.deleteResult = '';

    this.adminServices.getInActiveEmployees().subscribe(

      employeeList1 => {

        this.EmployeeLists = employeeList1;

        this.EmployeeLists = JSON.stringify(this.EmployeeLists);

        this.EmployeeLists = JSON.parse(this.EmployeeLists);

        console.log(this.EmployeeLists);

      },

      error => {

        console.log("error in Employee List Fetching ");

        console.log(error);

      }

    )

  }


  // delete employee

  deleteById(id: any) {
    Swal.fire({

      icon:'info',
  
      title:'Are you sure of deleting ?',
  
      cancelButtonText:'Cancel',
  
      showCancelButton:true,
  
     }).then((result)=>{
  
      if(result.isConfirmed){
    this.adminServices.deleteEmployee(id).subscribe(
      (data: any) => {
       
        Swal.fire('Success', 'Employee Deleted', 'success');
        this.getAllEmployees();
      },
      (_error) => {
        Swal.fire('Error', 'Error in deleting Employee ', 'error');
      }

      );
     
         }
     
        })
     
     
     
       }

  activateById(id: any) {
    this.adminServices.undoDelete(id).subscribe(
      result => {
        if (result) {
          // swal succsufful msg
          Swal.fire('Success', 'Employee Activated', 'success');
          this.getAllEmployees();
        }
        else {
          Swal.fire('UnSuccess', 'Unable to Activate Employee', 'success');
        }
      },
      (_error) => {
        Swal.fire('Error', 'Error in Activating Employee ', 'error');
      }
    )
  }







  // ADD employee
  formSubmit() {
    console.log(this.employee)
    if (this.employee.employeeId == '' || this.employee.employeeId == null) {
      // alert('user is required');
      this.snack.open('User name is Required !! ', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',

      });
      return;
    }
    this.adminServices.createEmployee(this.employee).subscribe(
      (data) => {
        console.log(data);

        Swal.fire('Successfully Added employee ');
        this.getAllEmployees();
        
      },
      (error) => {
        console.log(error);
        this.snack.open('Employee exist'
          , 'please add new employee', {
          duration: 3000,
        })
      }
    );
  }









  displayForm() {
    this.clearOld();
    this.displayFormCreation = 'addemployee form';
  }



  displayupdateForm(id: any) {

    this.clearOld();
    this.getUpdateEmployee(id);
    this.displayFormUpdation = 'update employee form';
  }

  updateformSubmit() {
    this.adminServices.updateEmployee(this.updateemployee).subscribe(
      (data: any) => {
        Swal.fire('Success !!', 'employee updated', 'success').then((e) => {
          this.getAllEmployees();
        });
      }, (error) => {
        Swal.fire('Error !!', 'Error in updating', 'error');
        console.log(error);
      }
    )
  }


  displaycreatepayslips() {
    this.clearOld();
    this.displaycreatepayslip = true;
  }


  SubmitTimefromTimeto() {
    var tFrom = new Date(this.createpayslip.timefrom);
    var tTo = new Date(this.createpayslip.timeto);
    if(tTo<tFrom){
      Swal.fire('Error !!', 'TimeTo should be greater than TimeFrom', 'error').then((e)=>{
       this.createpayslip.timeto='';
      });
    }
    else{

    
    this.adminServices.createpayslip(tFrom.getTime(), tTo.getTime()).subscribe(
      (data: any) => {
        Swal.fire('Success !!', 'payslips created', 'success').then((e) => {
          this.clearOld();
        });
      }, (error) => {
        Swal.fire('Error !!', 'Error in creating', 'error');
        console.log(error);
      }
    )
  }
}


  uploadWorkdays() {
    this.clearOld();
    this.displayuploadworkdays = true;
  }

  
  onUploadFile(event: any): void {

    //console.log(event)

    const file = event.target.files[0];

    this.userFile = file;

    console.log(this.userFile);
   
    if(event.target.files[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
       console.log("Valid File Format");
    else
    Swal.fire('Error !!', 'Invalid File format, Choose Xl Sheet only', 'error').then((e) => {
 
      event. target. value = null;
       
        
    });

    

  }





  uploade() {
    this.clearOld();
    const formData = new FormData();

    formData.append('file', this.userFile);

    this.uploadservice.uploadFile(formData).subscribe(

      (data: any) => {
        this.clearOld();
        this.errorMsg = data.errorMsg;
        if (this.errorMsg.length == 0) {
          Swal.fire('Success !!', 'File uploaded', 'success').then((e) => {

          });

        }
        else {
          this.snack.open('file uploaded'
            , 'some logs are preasent', {
            duration: 3000,
          })
        }
        console.log(this.errorMsg);

      }, (error) => {
        Swal.fire('Error !!', 'Error in Uploading', 'error');
        console.log(error);
      }
    );
  }

  private resportProgress(event: HttpEvent<string[]>) {

    console.log('report in progress');

  }

  //workdays
  
  getAllWorkdays() {

    this.clearOld();
    this.adminServices.getAllworkDays().subscribe(

      workDayList => {

        
        this.workDaysLists = workDayList;

      

        this.workDaysLists = JSON.stringify(this.workDaysLists);

        this.workDaysLists = JSON.parse(this.workDaysLists);


        console.log(this.workDaysLists);

      },

      error => {

        console.log("error in Employee List Fetching ");

        console.log(error);

      }

    )

  }

  onTableDataChange(event:any){
    this.page=event;
    if(this.workDaysLists){
      this.getAllWorkdays();
    }
    else{
      this.getAllEmployees();
    }
    
   
  }

  onTableSizeChangeEvent(event:any):void {
    this.tableSize=event.target.value;
    this.page=1;  

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


  // displayAdminUpdate(username:any){
  //   this.username=localStorage.getItem('userName');
  //   this.clearOld();
  //   this.getUpdateAdmin(username);
  //     this.displayAdminForm='update employee form';

  // }

  // updateAdminformSubmit(){
  //   this.userService.updateAdmin(this.updateAdmin).subscribe(
  //     (data:any)=>{
  //       Swal.fire('Success !!','Admin updated','success').then((e)=>{
  //        this.clearOld();
  //       });
  //     },(error)=>{
  //       Swal.fire('Error !!','Error in updating','error');
  //       console.log(error);
  //     }
  //   )
  // }

  displayResetPassword(username: any) {
    this.username = localStorage.getItem('userName');
    this.clearOld();
    this.getUpdateAdmin(username);
    this.displayResetForm = true;

  }

  updateResetformSubmit() {

 
      this.updateAdmin.password = this.password;
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

  displayAdmin() {
    this.clearOld();
    this.displayAdminprofile = true;
  }


//   displayAssist(){
// this.clearOld();
// this.getAllQueries();
// this.isDisplayAssist=true;
//   }

  getAllQueries() {

    this.clearOld();
    this.adminServices.getAllQueries().subscribe(

      queryList => {

        

        
        this.queryLists = queryList;

        this.queryLists = JSON.stringify(this.queryLists);

        this.queryLists = JSON.parse(this.queryLists);


        console.log(this.queryLists);

      },

      error => {

        console.log("error in query List Fetching ");

        console.log(error);

      }

    )

  }
answerIndex:any;
  isAnswer(i:any){
    this.supportAnswers.answer='';
    this.answer=true;
    
this.answerIndex=i;
  }

  answerSubmit(i:any){
    this.answer=false;
    let finalobj=this.queryLists[i];
    finalobj.supportAnswers=this.supportAnswers;
    this.questionAnswers.id=finalobj.id;
this.questionAnswers.employeeId=finalobj.employeeId;
this.questionAnswers.issueType=finalobj.issueType;
this.questionAnswers.subject=finalobj.subject;
this.questionAnswers.description=finalobj.description;
this.questionAnswers.supportAnswers=finalobj.supportAnswers;

this.adminServices.questionAnswers(this.questionAnswers).subscribe(
  (data) => {
    console.log(data);

    Swal.fire('Successfully answered');
   
    
  },
  (error) => {
    console.log(error);
    this.snack.open('cant answer'
      , 'please try later', {
      duration: 3000,
    })
  }
);
  }

}




