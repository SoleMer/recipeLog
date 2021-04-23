import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './User';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

const URL = 'https://recipeslog.000webhostapp.com/api/check';
//const URL = '/api/check';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _permission : boolean = false;
  permission: BehaviorSubject<boolean> = new BehaviorSubject(this._permission);

  constructor(private http: HttpClient) { }

  public login(user: User): any {
    return this.http.post(URL,JSON.stringify(user))
    .pipe(
      map((res:any)=> {
        if(res.status == 'ok')
        this.saveToken(res.token);
        return res;
      })
    )
  }

  private saveToken(token:string):void {
    localStorage.setItem('token',token);
  }

  public checkPermission() {
    if(localStorage.getItem('token')) {
      this._permission = true;
      this.permission.next(this._permission);
    }
  }
}
