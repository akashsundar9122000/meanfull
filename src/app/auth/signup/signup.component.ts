import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  isLoading=false;

  private authStatusSubs:Subscription
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.authStatusSubs=this.authService.getAuthStatusListener().subscribe(authStatus=>{
      this.isLoading=false;
    });
  }

  onSignup(form:NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading=true;
    this.authService.createUser(form.value.email,form.value.password);

    // this.router.navigate(['/login']);
  }

  ngOnDestroy(){
    this.authStatusSubs.unsubscribe();
  }

}
