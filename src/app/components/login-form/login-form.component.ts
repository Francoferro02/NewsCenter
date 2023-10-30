import { Component, EventEmitter, Input, Output, OnInit  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Input() showPopup: boolean = true;
  @Output() closePopupEvent = new EventEmitter<void>();


  loginForm = new FormGroup({
    name : new FormControl('', [Validators.required]),
    email : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required]),
  })

  ngOnInit(){

  }

  get name(){return this.loginForm.get('name')}
  get email(){return this.loginForm.get('name')}
  get password(){return this.loginForm.get('name')}

  onSubmit(){
    let cuenta = {
      name : this.name?.value || '',
      email : this.email?.value || '',
      password : this.password?.value || ''
    }
  }

  closePopup() {
    this.closePopupEvent.emit();
  }
}
