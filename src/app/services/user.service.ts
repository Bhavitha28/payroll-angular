import { Injectable } from '@angular/core';
import baseurl from './helper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseurl="http://localhost:8080/user/Signup"
  constructor(private http: HttpClient) { }



  public addUser(signup: any){
    return this.http.post('http://localhost:8080/user/Signup',signup);
  }

  public loginUser(token: any){
    
    sessionStorage.setItem('token',token.response);

    return true;

  }



  //islogin: user is log in or not

  public isLoggedIn(){

    let tokenStr=sessionStorage.getItem('token');

    if(tokenStr==undefined||tokenStr==''|| tokenStr==null){

    return false;

  }else{

    return true;

  }

}

public updateAdmin(updateAdmin:any){
  return this.http.put('http://localhost:8080/user/updateAdmin',updateAdmin);
}

public resetPassword(resetPassword:any){
  return this.http.put('http://localhost:8080/user/updateAdmin',resetPassword);
}

}
