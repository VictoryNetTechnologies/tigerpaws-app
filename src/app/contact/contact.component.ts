import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent {
  form: ReturnType<FormBuilder['group']>;
  submitting = signal(false);
  submitResult = signal<string | null>(null);

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      first: ['', Validators.required],
      last: [''],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.submitResult.set(null);
    const payload = this.form.value;
    this.http.post('/api/contact', payload).subscribe({
      next: () => {
        this.submitResult.set('Your message has been sent.');
        this.form.reset();
      },
      error: () => {
        this.submitResult.set('Error submitting message.');
      },
      complete: () => {
        this.submitting.set(false);
      }
    });
  }
}