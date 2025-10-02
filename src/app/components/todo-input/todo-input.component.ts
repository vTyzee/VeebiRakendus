import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-input.component.html',
})
export class TodoInputComponent {
  // Локальная строка ввода новой задачи
  uusNimi = '';

  // Событие наверх (родителю) — передаём текст новой задачи
  @Output() lisa = new EventEmitter<string>();

  // Обработчик кнопки "Lisa" и Enter
  lisaKlikk(): void {
    const clean = this.uusNimi.trim();
    if (!clean) return;
    this.lisa.emit(clean); // передаём текст родителю
    this.uusNimi = '';     // очищаем поле
  }
}
