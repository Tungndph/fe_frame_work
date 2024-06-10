import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  filterValue: string = '';

  router = inject(Router);
  isLoggedIn: boolean = false;
  username: string | null = null;
  constructor(private searchService: ProductService) { }
  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (token && user) {
      this.isLoggedIn = true;
      this.username = user.username;
      console.log(this.username);
    } else {
      this.isLoggedIn = false;
      this.username = null;
    }
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.username = null;
    this.router.navigate(['/']);
  }
  updateSearch(value: string): void {
    this.searchService.setSearchValue(value);
  }
}
