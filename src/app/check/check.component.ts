import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../User';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent implements OnInit {

  user : User = {
    username : '',
    password: ''
  };
  response: any;
  loading: boolean = false;
  error: boolean = false;
  
   constructor(private loginSvc: LoginService){}
  
   ngOnInit() :void {
     if(localStorage.getItem('token')) {
       localStorage.removeItem('token');
     }
   }
  
   login() {
    this.loading = true;
    this.user.username = 'andrea.lusich';
    this.loginSvc.login(this.user)
    .subscribe((r: any) => {
      this.response = r
      console.log(r);
      
      this.user = {
        username : "",
        password : '' 
      };
      this.loading = false;
      this.loginSvc.checkPermission();
    });
   }
}
