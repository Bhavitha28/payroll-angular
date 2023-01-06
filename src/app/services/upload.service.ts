import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadFile(formData:any){

    return this.http.post('http://localhost:8080/workdays/upload',formData).pipe(map(res => res));
    
  }
}
