import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { compileNgModule } from '@angular/compiler';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../Services/auth-service.service';


@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {
  @Input() showPopup1: boolean = true;
  @Output() loggedInChange = new EventEmitter<boolean>();
  @Output() closePopupEvent = new EventEmitter<void>();
  loggedIn: boolean = false;
  
  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private authService: AuthServiceService) {

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
    this.signUpForm.markAllAsTouched();

    // Verificar si todos los campos están vacíos
    const allFieldsEmpty = Object.keys(this.signUpForm.value).every(key => {
      const value = this.signUpForm.value[key];
      return value === null || value === '' || (Array.isArray(value) && value.length === 0);
    });

    if (this.signUpForm.valid && !allFieldsEmpty) {
      const user = {
        signUpEmail: this.signUpEmail?.value || '',
        signUpPassword: this.signUpPassword?.value || '',
      };
      this.userService.loginUser(user.signUpEmail, user.signUpPassword)
        .subscribe(
          (_loggedInUser) => {
            this.loggedIn = true;
            this.loggedInChange.emit(this.loggedIn);
            this.showSuccessMessage();
            this.closePopup1();
          },
          (_error) => {
            this.showFailMessage();
          }
        );
      this.authService.autenticarUsuario();
      console.log(this.authService.isUsuarioAutenticado);
    } else {
      alert('Todos los campos son obligatorios. Por favor, completa todos los campos.');
    }
  }
  

  showSuccessMessage(){
    alert('Log In Success');
  }
  showFailMessage(){
    alert('Log In Failed');
  }
  
  closePopup1() {
    this.closePopupEvent.emit();
  }
  
}
