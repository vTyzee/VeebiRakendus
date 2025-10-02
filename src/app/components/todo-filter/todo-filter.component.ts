import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

// Тип фильтра описываем локально (без импорта)
type FilterOlek = 'koik' | 'tehtud' | 'tegemata';

@Component({
  selector: 'app-todo-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-filter.component.html',
})
export class TodoFilterComponent {
  // Активный фильтр приходит от родителя
  @Input() aktiivne: FilterOlek = 'koik';

  // Событие наверх при переключении
  @Output() muuda = new EventEmitter<FilterOlek>();

  // Метод для выбора фильтра
  vali(f: FilterOlek): void {
    this.muuda.emit(f);
  }
}
