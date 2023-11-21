import { Component, EventEmitter, Input, Output, OnInit, SimpleChanges  } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { AuthServiceService } from '../Services/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { map,switchMap, debounceTime, catchError } from 'rxjs/operators';
import { Observable, of , timer} from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Input() showPopup: boolean = true;
  @Output() closePopupEvent = new EventEmitter<void>();
  loginForm: FormGroup;
  

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private authService: AuthServiceService,
              private http: HttpClient) {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required], [this.emailExistsValidator()]],
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
    this.loginForm.markAllAsTouched();
  
    // Verificar si todos los campos están vacíos
    const allFieldsEmpty = Object.keys(this.loginForm.value).every(key => {
      const value = this.loginForm.value[key];
      return value === null || value === '' || (Array.isArray(value) && value.length === 0);
    });
  
    if (this.loginForm.valid && !allFieldsEmpty) {
      const user = this.loginForm.value;
      this.userService.createUser(user).subscribe((response: any) => {
        if (response) {
          this.showSuccessMessage();
          this.closePopup();
        }
      });
    } else {
      alert('Todos los campos son obligatorios. Por favor, completa todos los campos.');
    }
  }
  
  showSuccessMessage(){
    alert('Registration Success');
  }

  closePopup() {
    this.closePopupEvent.emit();
  }


  emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value;
      console.log(email);
      if (!email) {
        return of(null);
      }

      return this.http.get<any[]>(`http://localhost:3000/users?email=${email}`).pipe(
        debounceTime(300),
        map(response => {
          
          return response && response.length > 0 ? { 'emailExists': true } : null;
          
        }),
        catchError(() => of(null))
      );
    };
  }



}
