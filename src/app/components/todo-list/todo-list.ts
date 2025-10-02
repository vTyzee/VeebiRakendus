import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  // Получаем от родителя уже отфильтрованный список задач
  // Тип описываем прямо здесь, без отдельной модели
  @Input() ulesanded: { id: number; nimi: string; tehtud: boolean }[] = [];

  // Событие наверх при клике по чекбоксу (меняем статус у задачи)
  @Output() olekuMuutus = new EventEmitter<{ id: number; tehtud: boolean }>();

  // Обработчик чекбокса
  muuda(e: Event, u: { id: number; nimi: string; tehtud: boolean }): void {
    const target = e.target as HTMLInputElement;
    this.olekuMuutus.emit({ id: u.id, tehtud: target.checked });
  }
}
