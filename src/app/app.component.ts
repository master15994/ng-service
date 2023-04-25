import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
export interface Todo {
  completed: boolean;
  title: string;
  id?: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  todos: Todo[] = [];

  todoTitle = '';

  loading = false;

  ngOnInit(): void {
    this.fetchTodo();
  }

  fetchTodo() {
    this.loading = true;
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=3')
      .pipe(delay(800))
      .subscribe((todos) => {
        this.todos = todos;
        this.loading = false;
      });
  }
  removeTodo(id: number) {
    this.http
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .subscribe((res) => {
        console.log(res);
      });
  }
  addTodo() {
    if (!this.todoTitle.trim()) {
      return;
    }
    const newTodo: Todo = {
      title: this.todoTitle,
      completed: false,
    };
    this.http
      .post<Todo>('https://jsonplaceholder.typicode.com/todos', newTodo)
      .subscribe((todo) => {
        console.log(todo);
        this.todos.push(todo);
        this.todoTitle = '';
      });
  }
}
