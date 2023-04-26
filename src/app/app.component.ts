import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { Todo, TodosService } from './todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];

  todoTitle = '';

  loading = false;

  errors = '';

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.fetchTodo();
  }

  completeTodo(id: any) {
    this.todosService.completeTodo(id).subscribe((todo) => {
      const foundTodo = this.todos.find((t) => t.id === todo.id);
      if (foundTodo) {
        foundTodo.completed = true;
      }
    });
  }

  fetchTodo() {
    this.loading = true;
    this.todosService.fetchTodos().subscribe(
      (todos) => {
        this.todos = todos;
        this.loading = false;
      },
      (error) => {
        this.errors = error.message;
      },
      () => {}
    );
  }

  removeTodo(id: any) {
    this.todosService.removeTodos(id).subscribe((res) => {
      this.todos = this.todos.filter((t) => t.id !== id);
    });
  }

  addTodo() {
    if (!this.todoTitle.trim()) {
      return;
    }

    this.todosService
      .addTodo({
        title: this.todoTitle,
        completed: false,
      })
      .subscribe((todo) => {
        console.log(todo);
        this.todos.push(todo);
        this.todoTitle = '';
      });
  }
}
