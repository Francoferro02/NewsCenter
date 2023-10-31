import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  @Input() showPopup1: boolean = true;
  @Output() closePopupEvent = new EventEmitter<void>();

  
  signUpForm: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.signUpForm = this.formBuilder.group({
      signUpEmail: ['', Validators.required],
      signUpPassword: ['', Validators.required]
    });
  }


  ngOnInit(){

  }

 
  get signUpEmail(){return this.signUpForm.get('signUpEmail')}
  get signUpPassword(){return this.signUpForm.get('signUpPassword')}

  onSubmit(){
    let cuenta = {
      signUpEmail : this.signUpEmail?.value || '',
      signUpPassword : this.signUpPassword?.value || ''
    }
  }


  closePopup1() {
    this.closePopupEvent.emit();
  }
}
