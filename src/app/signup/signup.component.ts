import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 
  form: FormGroup = new FormGroup({});

  constructor(private userService:UserService, private snack:MatSnackBar,private fb: FormBuilder) { 
    this.form = fb.group({

    PASSWORD: ['', [Validators.required]],

    // confirm_password: ['', [Validators.required]]

  }, {

  //  validator: ConfirmedValidator('PASSWORD', 'confirm_password')

  })



}



get f(){

return this.form.controls;

}

  public user={
    userName: '',
    password: '',
    employeeId:'',
    userType:'Employee',
    employeeName:'',
    mobileNumber:''
  };

  ngOnInit(): void {
  }

  registerform = new FormGroup({



    EMPLOYEENAME : new FormControl("" , [

      Validators.required,

       Validators.minLength(3),                          

      Validators.pattern("[a-zA-Z]+")

    ]),



    EMPLOYEEID : new FormControl("" , [

      Validators.required,
                        

      Validators.pattern("[SG].[0-9]*")

    ]),

    // AGE: new FormControl("",[

    //   Validators.required,

    //   Validators.pattern("[0-9]*"),

    //   Validators.min(10),

    //   Validators.max(50)

    // ]),



    USERNAME : new FormControl("",[

      Validators.required,

      Validators.minLength(5), 
      Validators.maxLength(10),                         

      Validators.pattern("[a-zA-Z].*"),
     
      

      // Validators.email

    ]),



    PASSWORD: new FormControl("",[

      Validators.required,

      Validators.minLength(7),    

      Validators.maxLength(16),

      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.* )(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),



    ]),



    // confirm_password: new FormControl(""),



    MOBILENUMBER : new FormControl("",[

      Validators.required,

      Validators.pattern("[0-9]*"),

      Validators.minLength(10),

      Validators.maxLength(10)

    ]),



    // EMAIL : new FormControl("",[

    //   Validators.required,

    //   Validators.email

    // ]),



   

  });

  get employeeID(){

    return this.registerform.get("EMPLOYEEID") as FormControl;

   }

  get employeeName(){

    return this.registerform.get("EMPLOYEENAME") as FormControl;

   }

   get Userame(){

    return this.registerform.get("USERNAME") as FormControl;

   }

  //  get Age(){

  //   return this.registerform.get("AGE") as FormControl;

  //  }

   get Password(){

    return this.registerform.get("PASSWORD") as FormControl;

   }
   get EmployeeId(){

    return this.registerform.get("EMPLOYEEID") as FormControl;

   }
   get MobileNo(){

    return this.registerform.get("MOBILENUMBER") as FormControl;

   }

  //  get Email(){

  //   return this.registerform.get("EMAIL") as FormControl;

  //  }

  formSubmit(){
     console.log(this.user)
     if(this.user.userName == '' || this.user.userName == null){
     // alert('user is required');
     this.snack.open('User name is Required !! ','',{
      duration:3000,
      verticalPosition:'top',
      horizontalPosition:'right',
     
    });
      return;
     }
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        console.log(data);
        

      Swal.fire('Successfully done !!','user is registered','success' );
      window.location.reload();
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
}

