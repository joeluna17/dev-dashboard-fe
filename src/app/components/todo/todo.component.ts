import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  public todos = [
    { title: 'Make Breakfast', date: '', time: '', complete: false },
    { title: 'Review Pull Request', date: '', time: '', complete: true },
    { title: 'Refactor TS', date: '', time: '', complete: false },
  ];

  todosForm = this.fb.group({
    title: ['', [Validators.required]],
    date: ['', [Validators.required]],
    time: [''],
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
    const newTodo = {
      title: this.todosForm.value.title,
      date: this.todosForm.value.date,
      time: this.todosForm.value.time,
      complete: false,
    };
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
}
