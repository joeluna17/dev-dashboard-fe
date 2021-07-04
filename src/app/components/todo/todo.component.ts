import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  panelOpenState = false;
  public todos: Array<Todo> = [
    new Todo(
      'Eat Food',
      '12/23/2021',
      '',
      false,
      false,
      'Need to do this asap or we are going to get grumpy!'
    ),
    new Todo(
      'Check PRs',
      '12/24/2021',
      '',
      false,
      true,
      'There is a spacial case that we are looking for and we need to make sure this is possible'
    ),
    new Todo(
      'Production Check',
      '12/24/2021',
      '',
      false,
      false,
      'Go to Azure and we sure that we are not pointed to production from develop'
    ),
    new Todo(
      'Production Check',
      '12/24/2021',
      '',
      false,
      false,
      'Go to Azure and we sure that we are not pointed to production from develop'
    ),
    new Todo(
      'Production Check',
      '12/24/2021',
      '',
      true,
      false,
      'Go to Azure and we sure that we are not pointed to production from develop'
    ),
    new Todo(
      'Production Check',
      '12/24/2021',
      '',
      false,
      false,
      'Go to Azure and we sure that we are not pointed to production from develop'
    ),
  ];

  // { title: 'Review Pull Request', date: '', time: '', complete: true },
  // { title: 'Refactor TS', date: '', time: '', complete: false },

  public todosForm: FormGroup = this.fb.group({
    title: [null, [Validators.required]],
    date: [null, [Validators.required]],
    time: [null],
  });

  get title() {
    return this.todosForm.get('title');
  }
  get date() {
    return this.todosForm.get('date');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  submitTodo() {
    console.log(this.todosForm);
    const newTodo: Todo = new Todo(
      this.todosForm.value.title,
      this.todosForm.value.date,
      this.todosForm.value.time,
      false,
      false,
      ''
    );
    this.todos.push(newTodo);
    this.clearForm();
  }

  clearForm() {
    this.todosForm.setValue({ title: '', date: '', time: '' });
    this.todosForm.reset();
    Object.keys(this.todosForm.controls).forEach((key) => {
      // this code resets the errors & validaion back to inital state
      this.todosForm.controls[key].setErrors(null);
    });
  }

  handleComplete(i: number) {
    this.todos[i].complete = !this.todos[i].complete;
  }

  handleDeleteTodo(i: number) {
    this.todos.splice(i, 1); // remove 1 item at index i
  }

  handleTogglePaused(i: number) {
    this.todos[i].paused = !this.todos[i].paused;
  }

  showTodosComplete(): string {
    return String(this.todos.filter((todo) => todo.complete).length);
  }

  showTodosPaused(): string {
    return String(this.todos.filter((todo) => todo.paused).length);
  }
}

//https://www.codementor.io/@jimohhadi/angular-validators-with-conditional-validation-in-reactive-forms-pj5z7gsq5

interface ITodo {
  title: string;
  date: string;
  time: string;
  complete: boolean;
  paused: boolean;
  description: string;
}

class Todo implements ITodo {
  title: string;
  date: string;
  time: string;
  complete: boolean;
  paused: boolean;
  description: string;

  constructor(
    title: string,
    date: string,
    time: string,
    complete: boolean = false,
    paused: boolean = false,
    description: string
  ) {
    this.title = title;
    this.date = date;
    this.time = time;
    this.complete = complete;
    this.paused = paused;
    this.description = description;
  }
}
