import {
  FormControl,
  FormGroup,
  NgForm,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(private fb: FormBuilder, private Http: HttpClient) {}
  contactForm = this.fb.group({
    title: ['', [Validators.required]],
    fullname: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    email: ['', [Validators.required]],
    address: ['', [Validators.required]],
    content: ['', [Validators.required]],
  });
  ngOnInit(): void {}
  get f() {
    return this.contactForm.controls;
  }
  onSubmit() {
    if (this.contactForm.invalid) {
      confirm('Bạn cận nhập đủ thông tin');
    } else {
      this.Http.post<Boolean>(
        'https://localhost:44376/api/contact',
        this.contactForm.value
      ).subscribe((res) => {
        if (res) {
          window.alert('Gửi thành công');
          window.location.reload();
        }
      });
    }
  }
}
