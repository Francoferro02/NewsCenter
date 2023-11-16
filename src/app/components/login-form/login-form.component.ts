import { Component, EventEmitter, Input, Output, OnInit, SimpleChanges  } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { UserService } from '../Services/user.service';
import { AuthServiceService } from '../Services/auth-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Input() showPopup: boolean = true;
  @Output() closePopupEvent = new EventEmitter<void>();
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private authService: AuthServiceService) {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      location: ['', Validators.required],
      rolbio: ['', Validators.required],
      savedNews: [[]],
      join: Date.now(),
      img: String,
      
    });
  }

  ngOnInit(){

  }

  get name(){return this.loginForm.get('name')}
  get email(){return this.loginForm.get('email')}
  get password(){return this.loginForm.get('password')}
  get surname(){return this.loginForm.get('surname')}
  get location(){return this.loginForm.get('location')}
  get rolbio(){return this.loginForm.get('rolbio')}
  get savedNews(){return this.loginForm.get('savedNews')}
  

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showPopup'] && !changes['showPopup'].firstChange) {
      // Se ha cambiado el valor de showPopup después del primer cambio
      if (!this.showPopup) {
        // Si showPopup es false, cerrar el formulario
        this.closePopup();
      }
    }
  }


  onSubmit() {
    if (this.loginForm.valid) {
      const user = this.loginForm.value;
      this.userService.createUser(user).subscribe((response: any) => {
        if (response) {
          this.showSuccessMessage();
        
          this.closePopup();
        }
      });
    }
  }
  
  showSuccessMessage(){
    alert('Registration Success');
  }

  closePopup() {
    this.closePopupEvent.emit();
  }


}
