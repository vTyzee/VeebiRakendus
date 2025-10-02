import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { TodoListComponent } from './components/todo-list/todo-list';
import { TodoFilterComponent } from './components/todo-filter/todo-filter.component';

// Локальные типы прямо в этом файле (без отдельной модели)
type Ulesanne = { id: number; nimi: string; tehtud: boolean };
type FilterOlek = 'koik' | 'tehtud' | 'tegemata';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TodoInputComponent, TodoListComponent, TodoFilterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  // Заголовок страницы
  pealkiri = 'Ülesannete loend';

  // Ключ для localStorage
  private readonly STORAGE_KEY = 'todo_ulesanded_v1';

  // Полный список задач и отображаемый (после фильтра)
  koik: Ulesanne[] = [];
  kuvatavad: Ulesanne[] = [];

  // Активный фильтр
  filter: FilterOlek = 'koik';

  // Счётчики
  kokku = 0;   // всего
  tehtud = 0;  // выполнено

  constructor() {
    // При старте читаем из localStorage и применяем фильтр
    this.koik = this.readFromLocal();
    this.updateView();
  }

  // === Работа с localStorage (простая сериализация массива) ===
  private readFromLocal(): Ulesanne[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return [];
      const arr = JSON.parse(raw) as Ulesanne[];
      // Небольшая валидация: гарантируем поля
      return Array.isArray(arr) ? arr.map(x => ({
        id: Number(x.id),
        nimi: String(x.nimi ?? ''),
        tehtud: Boolean(x.tehtud),
      })) : [];
    } catch {
      return [];
    }
  }

  private writeToLocal(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.koik));
  }

  // === Обработчики для детей ===

  // Добавление новой задачи (получаем текст от компонента ввода)
  lisaUlesanne(nimi: string): void {
    const clean = (nimi ?? '').trim();
    if (!clean) return;
    const uus: Ulesanne = { id: Date.now(), nimi: clean, tehtud: false };
    this.koik = [...this.koik, uus]; // иммутабельно добавляем
    this.persistAndRefresh();
  }

  // Переключение статуса задачи (получаем id и новое значение чекбокса)
  muudaOlek(event: { id: number; tehtud: boolean }): void {
    this.koik = this.koik.map(u => u.id === event.id ? { ...u, tehtud: event.tehtud } : u);
    this.persistAndRefresh();
  }

  // Смена фильтра
  muudaFilter(f: FilterOlek): void {
    this.filter = f;
    this.updateView();
  }

  // === Утилиты отображения ===

  // Сохраняем и пересчитываем вид + счетчики
  private persistAndRefresh(): void {
    this.writeToLocal();
    this.updateView();
  }

  // Применяем фильтр и пересчитываем счетчики
  private updateView(): void {
    if (this.filter === 'koik') {
      this.kuvatavad = [...this.koik];
    } else if (this.filter === 'tehtud') {
      this.kuvatavad = this.koik.filter(u => u.tehtud);
    } else {
      this.kuvatavad = this.koik.filter(u => !u.tehtud);
    }

    this.kokku = this.koik.length;
    this.tehtud = this.koik.filter(u => u.tehtud).length;
  }
}
