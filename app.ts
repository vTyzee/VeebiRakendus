import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h2>Список пользователей</h2>

    <input #nameInput type="text" placeholder="Введите имя">
    <button (click)="addUser(nameInput.value); nameInput.value=''">Добавить</button>

    <br><br>

    <input #searchInput type="text" placeholder="Поиск" (input)="onSearch(searchInput.value)">

    <ul>
      <li *ngFor="let user of getFilteredUsers()">
        {{ user }}
        <button (click)="deleteUser(user)">Удалить</button>
      </li>
    </ul>
  `,
})
export class AppComponent {
  users: string[] = ['Anna', 'Boris', 'Viktor'];
  searchTerm: string = '';

  addUser(name: string) {
    const trimmed = name.trim();
    if (trimmed && !this.users.includes(trimmed)) {
      this.users.push(trimmed);
    }
  }

  deleteUser(name: string) {
    this.users = this.users.filter(user => user !== name);
  }

  onSearch(value: string) {
    this.searchTerm = value.trim().toLowerCase();
  }

  getFilteredUsers(): string[] {
    if (!this.searchTerm) {
      return this.users;
    }

    return this.users.filter(user =>
      user.toLowerCase().includes(this.searchTerm)
    );
  }
}
