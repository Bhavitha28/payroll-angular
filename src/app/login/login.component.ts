import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/Login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   loginData={
    userName:'',
    password:'',
   };
  role:any;
 
  constructor(private snack:MatSnackBar,private login:LoginService,private router: Router) { }

  ngOnInit(): void {

    this.login.logout()
  }
  formSubmit(){
    console.log('Login btn Clicked');

    if(this.loginData.userName.trim()==''|| this.loginData.userName==null){
      this.snack.open('Username is Required !!','',{
        duration:3000,
      });
      return;

    }
    
    if(this.loginData.password.trim()==''|| this.loginData.password==null){
      this.snack.open('Password is Required !!','',{
        duration:3000,
      });
      return;

    }

    //request to server to generate token

    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("Success");
        console.log(data);

      //login....
      this.login.loginUser(data);
      this.login.getCurrentUser(this.loginData.userName).subscribe(
       (user:any)=>{
        //this.login.setUser(user);
        console.log(user);
          user=JSON.stringify(user);
          localStorage.setItem('user',user);


          user=JSON.parse(user);
          localStorage.setItem('role',user.userType);
localStorage.setItem('username',user.userName);
          this.role=localStorage.getItem('role');
          let userNew=localStorage.getItem('user');
          console.log(userNew);
          console.log(this.role);
  
         
            //redirecrt---ADMIN: admin-dashboard
            //redirect-----NORMAL:normal-dashboard
  
            if(this.role=='Admin'){
              //admin dashboard
              //window.location.href='/admin';
              this.router.navigate(['admin-dashboard'])
              this.login.loginStatusSubject.next(true);
            }else if(this.role=='Employee'){
              //normal user dashboard
             // window.location.href='/user-dashboard';
             this.router.navigate(['employee-dashboard']);
             
            }else{
              this.login.logout();
              
            }
             
        }
        );



      },
      error=>{
        console.log("error !!")
        console.log(error);
        this.snack.open('Invalid Details !! Try Again','',{
          duration:3000,
        });
      }
    )
  
    }
}