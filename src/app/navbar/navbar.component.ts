import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/Login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



  isLoggedIn=false;

  user=null;



  constructor(public login:LoginService,private router:Router) { }



  ngOnInit(): void {

    this.isLoggedIn=this.login.isLoggedIn();

    this.user=this.login.getUser();

    this.login.loginStatusSubject.asObservable().subscribe(data=>{

      this.isLoggedIn=this.login.isLoggedIn();

    this.user=this.login.getUser();

    })

  }



  public logout(){

    this.login.logout();
    this.router.navigateByUrl('/login')
    //window.location.reload();

  }
}
