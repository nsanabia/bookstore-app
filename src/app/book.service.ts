import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'https://localhost:7147/api/books'; // Atualize a URL conforme necessário
  private booksUpdatedSubject = new Subject<void>();
  private selectedBookSubject = new Subject<Book>();
  
  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book).pipe(
      tap(() => this.booksUpdatedSubject.next())
    );
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${id}`, book).pipe(
      tap(() => this.booksUpdatedSubject.next())
    );
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getBooksUpdated(): Observable<void> {
    return this.booksUpdatedSubject.asObservable();
  }

  setSelectedBook(book: Book): void {
    this.selectedBookSubject.next(book);
  }

  getSelectedBook(): Observable<Book> {
    return this.selectedBookSubject.asObservable();
  }
}
