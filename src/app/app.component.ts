import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  VERSION,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { validateAnimal } from './validators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  name = 'Angular ' + VERSION.major;

  @ViewChild('submitBtn', { read: ElementRef })
  submitBtn: ElementRef;

  myForm = new FormGroup({
    // https://netbasal.com/angular-reactive-forms-the-ultimate-guide-to-formarray-3adbe6b0b61a
    options: new FormArray([]),
  });

  get options() {
    return this.myForm.get('options') as FormArray;
  }

  ngOnInit(): void {
    // Generate a bunch of forms
    this.populateFormOptions();
  }

  ngAfterViewInit() {
    this.submitBtn.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }

  populateFormOptions() {
    for (let i = 0; i < 10; i++) {
      this.options.push(
        new FormControl('', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]+$/),
          // Custom validator
          validateAnimal(),
        ])
      );
    }
  }

  partAutofill() {
    for (let i = 0; i < this.options.controls.length / 2; i++) {
      this.options.controls[i].setValue('dog');
    }
  }

  submit() {
    this.myForm.markAllAsTouched();
  }

  reset() {
    for (let c of this.options.controls) {
      c.reset('');
    }
  }
}
