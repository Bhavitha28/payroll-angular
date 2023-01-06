import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/Login.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public loginservice:LoginService) { }

  ngOnInit(): void {
    this.loginservice.logout()
  }

}
