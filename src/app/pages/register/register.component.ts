import { NgClass,NgIf  } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { NgToastModule, NgToastService } from 'ng-angular-popup';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgClass, NgToastModule, NgxPaginationModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  userService = inject(UserService);
  router = inject(Router);
  toast = inject(NgToastService);
  hide: boolean = true;

  register = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  toggleVisibility() {
    this.hide = !this.hide;
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.register.value);
    this.loading = true;

    // Call API, navigate, show notification
    this.userService.signup(this.register.value).subscribe({
      next: () => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Thêm tài khoản mới thành công',
          duration: 5000,
          sticky: false,
        });

        setTimeout(() => {
          this.router.navigate(['/admin/products/list']);
        }, 2000);
      },
      error: (error) => {
        console.error(error.message);
        this.toast.error({
          detail: 'ERROR',
          summary: 'API Not Found',
          duration: 5000,
          sticky: true,
        });
        this.toast.error({
          detail: 'ERROR',
          summary: 'Có lỗi xảy ra khi thêm tài khoản',
          duration: 5000,
          sticky: true,
        });
        this.loading = false;
      },
    });
  }
}
