import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-add-balance',
  templateUrl: './add-balance.component.html',
  styleUrls: ['./add-balance.component.css']
})
export class AddBalanceComponent implements OnInit {

  public addBalanceForm: FormGroup;
  public errMsg:string="";
  public step = 0;
  constructor(private authservice: AuthService, private fb: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.addBalanceForm = this.fb.group({
      username: [''],
      password: ['']
    });
    this.step = 0;
  }

  public get walletBalance()  {
    return this.addBalanceForm.controls.walletBalance;
  }

  onSubmit()
  {
    const walletBalance: string = this.addBalanceForm.get('walletBalance').value;
    this.authservice.addBalance(walletBalance).subscribe(
      res=>
      {
        this.step++;
      },
      error=>
      {
        this.errMsg=error.error.message;
      }
    )
  }

  back()
  {
    this.ngOnInit();
  }

}
