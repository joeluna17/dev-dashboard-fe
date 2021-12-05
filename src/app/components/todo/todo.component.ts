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
  public todoFactory: TodoFactory = new TodoFactory();
  public todosTitle: string = 'Todo Total';
  public completeTitle: string = 'Todos Complete Total';
  public pausedTitle: string = 'Todos Paused Total';
  public tileColours: Array<string> = ['1b9aaa', '06d6a0', 'ffc43d'];
  public todos: Array<ITodo> = [
    new PersonalTodo(
      ETodoType.Personal,
      'Eat Food',
      '12/23/2021',
      '',
      false,
      false,
      'Need to do this asap or we are going to get grumpy!'
    ),
    new PersonalTodo(
      ETodoType.Personal,
      'Check PRs',
      '12/24/2021',
      '',
      false,
      true,
      'There is a spacial case that we are looking for and we need to make sure this is possible'
    ),
    new WorkTodo(
      ETodoType.Work,
      'Production Check',
      '12/24/2021',
      '',
      false,
      false,
      'Go to Azure and we sure that we are not pointed to production from develop',
      ''
    ),
    new PersonalTodo(
      ETodoType.Personal,
      'Production Check',
      '12/24/2021',
      '',
      false,
      false,
      'Go to Azure and we sure that we are not pointed to production from develop'
    ),
    new WorkTodo(
      ETodoType.Work,
      'Production Check',
      '12/24/2021',
      '',
      true,
      false,
      'Go to Azure and we sure that we are not pointed to production from develop',
      ''
    ),
    new WorkTodo(
      ETodoType.Work,
      'Production Check',
      '12/24/2021',
      '',
      false,
      false,
      'Go to Azure and we sure that we are not pointed to production from develop',
      ''
    ),
  ];
  public filterTodosRest: Array<ITodo> = [];
  public showAchievement: boolean = true;

  // { title: 'Review Pull Request', date: '', time: '', complete: true },
  // { title: 'Refactor TS', date: '', time: '', complete: false },

  public todosForm: FormGroup = this.fb.group({
    type: [null, [Validators.required]],
    title: [null, [Validators.required]],
    date: [null, [Validators.required]],
    time: [null],
    requestor: [null],
  });

  get title() {
    return this.todosForm.get('title');
  }
  get date() {
    return this.todosForm.get('date');
  }

  get requestor() {
    return this.todosForm.get('requestor');
  }

  public filterTodosGroup: FormGroup = this.fb.group({
    filterSelect: [null, [Validators.required]],
  });

  get filterSelect() {
    return this.filterTodosGroup.get('filterSelect');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  setStyles() {
    const progress = this.handleCalcProgress();
    return {
      backgroundColor: 'rebeccapurple',
      width: `${progress}%`,
    };
  }

  submitTodo() {
    const newTodo: ITodo = this.todoFactory.getTodo(
      this.todosForm.value.type,
      this.todosForm.value.title,
      this.todosForm.value.date,
      this.todosForm.value.time,
      false,
      false,
      '',
      this.todosForm.value.requestor
    );
    console.log(newTodo, typeof newTodo);
    this.todos.push(newTodo);
    this.clearForm();
  }

  clearForm() {
    this.todosForm.setValue({
      type: '',
      title: '',
      date: '',
      time: '',
      requestor: '',
    });
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

  handleCalcProgress(): string {
    const complete = this.todos.filter((todo) => todo.complete).length;
    const todoTotal = this.todos.length;
    const prog = String(Math.floor((complete / todoTotal) * 100));
    return prog;
  }

  handleShowFinishReward() {
    if (this.handleCalcProgress() === '100' && this.showAchievement) {
      setTimeout(() => {
        this.showAchievement = false;
      }, 8000);
      return true;
    } else {
      this.showAchievement = true;
      return false;
    }
  }

  filterTodos() {
    this.filterTodosRest = [...this.todos];
    const filter: string = this.filterTodosGroup.value.filterSelect;
    let holder: Array<ITodo> = [];
    this.todos.forEach((todo, i) => {
      if (todo[filter as keyof ITodo]) {
        // rember that here we are using classes so accessing key like we do in a pojo cannot be done in TS hence the keyOf
        holder.push(todo);
      }
    });
    this.todos = [...holder];
  }

  resetTodos() {
    this.todos = [...this.filterTodosRest];
    this.filterTodosGroup.reset();
  }

  showTodosComplete(): string {
    return String(this.todos.filter((todo) => todo.complete).length);
  }

  showTodosPaused(): string {
    return String(this.todos.filter((todo) => todo.paused).length);
  }
}

//https://www.codementor.io/@jimohhadi/angular-validators-with-conditional-validation-in-reactive-forms-pj5z7gsq5

// interface ITodo {
//   title: string;
//   date: string;
//   time: string;
//   complete: boolean;
//   paused: boolean;
//   description: string;
// }

// class Todo implements ITodo {
//   title: string;
//   date: string;
//   time: string;
//   complete: boolean;
//   paused: boolean;
//   description: string;

//   constructor(
//     title: string,
//     date: string,
//     time: string,
//     complete: boolean = false,
//     paused: boolean = false,
//     description: string
//   ) {
//     this.title = title;
//     this.date = date;
//     this.time = time;
//     this.complete = complete;
//     this.paused = paused;
//     this.description = description;
//   }
// }

interface ITodo {
  type: ETodoType;
  title: string;
  date: string;
  time: string;
  complete: boolean;
  paused: boolean;
  description: string;
  getInfo(): void;
}

enum ETodoType {
  Work = 1,
  Personal = 2,
}

class WorkTodo implements ITodo {
  type: ETodoType;
  title: string;
  date: string;
  time: string;
  complete: boolean;
  paused: boolean;
  description: string;
  requestor: string;

  constructor(
    type: ETodoType,
    title: string,
    date: string,
    time: string,
    complete: boolean = false,
    paused: boolean = false,
    description: string,
    requestor: string
  ) {
    this.type = type;
    this.title = title;
    this.date = date;
    this.time = time;
    this.complete = complete;
    this.paused = paused;
    this.description = description;
    this.requestor = requestor;
  }

  getInfo(): void {
    throw new Error('Method not implemented.');
  }
}

class PersonalTodo implements ITodo {
  public type: ETodoType;
  public title: string;
  public date: string;
  public time: string;
  public complete: boolean;
  public paused: boolean;
  public description: string;

  constructor(
    type: ETodoType,
    title: string,
    date: string,
    time: string,
    complete: boolean = false,
    paused: boolean = false,
    description: string
  ) {
    this.type = type;
    this.title = title;
    this.date = date;
    this.time = time;
    this.complete = complete;
    this.paused = paused;
    this.description = description;
  }

  getInfo(): void {
    throw new Error('Method not implemented.');
  }
}

class TodoFactory {
  public getTodo(
    type: ETodoType,
    title: any,
    date: any,
    time: any,
    complete: any,
    paused: any,
    description: any,
    requestor: string
  ): ITodo {
    console.log(type);
    switch (Number(type)) {
      case ETodoType.Work:
        return new WorkTodo(
          type,
          title,
          date,
          time,
          complete,
          paused,
          description,
          requestor
        );
      case ETodoType.Personal:
        return new PersonalTodo(
          type,
          title,
          date,
          time,
          complete,
          paused,
          description
        );
      default:
        return new WorkTodo(
          type,
          title,
          date,
          time,
          complete,
          paused,
          description,
          requestor
        );
    }
  }
}
