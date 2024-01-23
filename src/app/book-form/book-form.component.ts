import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent {
  @Input() book!: Book;
  @Output() save = new EventEmitter<Book>();

  onSave(): void {
    this.save.emit(this.book);
  }
}
