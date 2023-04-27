import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map, tap } from 'rxjs';

export interface Todo {
  completed: boolean;
  title: string;
  id?: number;
}

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(
      'https://jsonplaceholder.typicode.com/todos',
      todo,
      {
        headers: new HttpHeaders({
          'My job sit at home and solve the problem': Math.random().toString(),
        }),
      }
    );
    //   .subscribe((todo) => {
    //     console.log(todo);
    //     this.todos.push(todo);
    //     this.todoTitle = '';
    //   });
  }

  fetchTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos?', {
        params: new HttpParams().set('_limit', '7'), //добавляем query-параметры ,
        observe: 'body',
      })
      .pipe(delay(800));
  }

  removeTodos(id: number) {
    return this.http
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        observe: 'events',
      })
      .pipe(
        tap((event) => {
          if (event.type === HttpEventType.Sent) {
            console.log('sent', event);
          }
          if (event.type === HttpEventType.Response) {
            console.log('response', event);
          }
        })
      );
  }

  completeTodo(id: any): Observable<Todo> {
    return this.http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        completed: true,
      }
    );
  }
}
