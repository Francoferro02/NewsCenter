import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  @Input() showPopup1: boolean = true;
  @Output() closePopupEvent = new EventEmitter<void>();

  
  signUpForm: FormGroup

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.signUpForm = this.formBuilder.group({
      signUpEmail: ['', Validators.required],
      signUpPassword: ['', Validators.required]
    });
  }


  ngOnInit(){

  }

 
  get signUpEmail(){return this.signUpForm.get('signUpEmail')}
  get signUpPassword(){return this.signUpForm.get('signUpPassword')}

  onSubmit() {
    if (this.signUpForm.valid) {
      const user = {
        signUpEmail: this.signUpEmail?.value || '',
        signUpPassword: this.signUpPassword?.value || '',
      };
      this.userService.loginUser(user.signUpEmail.value, user.signUpPassword.value);
      this.showSuccessMessage()
      this.closePopup1()
    }
  }

  showSuccessMessage(){
    alert('Log In Success');
  }
  
  closePopup1() {
    this.closePopupEvent.emit();
  }
}
