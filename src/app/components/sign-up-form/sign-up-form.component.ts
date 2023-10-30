import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent {
  @Input() showPopup1: boolean = true;
  @Output() closePopupEvent = new EventEmitter<void>();

  




  closePopup1() {
    this.closePopupEvent.emit();
  }
}
