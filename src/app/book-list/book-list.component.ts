import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  private booksUpdatedSubscription: Subscription | undefined;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();

    this.booksUpdatedSubscription = this.bookService.getBooksUpdated().subscribe(() => {
      this.loadBooks();
    });
  }

  ngOnDestroy(): void {
    this.booksUpdatedSubscription?.unsubscribe();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe(books => this.books = books);
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe(() => this.loadBooks());
  }

  editBook(book: Book): void {
    this.bookService.setSelectedBook(book);
  }
}
