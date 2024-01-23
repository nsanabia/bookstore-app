import { Component, OnInit } from '@angular/core';
import { Book } from './book.model';
import { BookService } from './book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  selectedBook: Book = { id: 0, title: '', author: '' };

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getSelectedBook().subscribe(book => {
      this.selectedBook = { ...book };
    });
  }

  saveBook(book: Book): void {
    if (book.id) {
      this.bookService.updateBook(book.id, book).subscribe(() => this.clearSelection());
    } else {
      this.bookService.addBook(book).subscribe(() => this.clearSelection());
    }
  }

  clearSelection(): void {
    this.selectedBook = { id: 0, title: '', author: '' };
  }
}
