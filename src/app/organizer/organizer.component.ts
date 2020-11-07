import { Component, OnInit } from '@angular/core';
import {DateService} from '../shared/date.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task, TaskService} from '../shared/task.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {

  form: FormGroup;
  tasks: Task[] = [];

  constructor(public dateService: DateService,
              private taskService: TaskService) { }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value => this.taskService.read(value))
    ).subscribe(tasks => {
      this.tasks = tasks;
    });

    this.form = new FormGroup({
      title: new FormControl('', Validators.required)
    });
  }

  submit(): void {
    const {title} = this.form.value;
    const task: Task = {
      title,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    };
    this.taskService.create(task).subscribe(task => {
      this.tasks.push(task);
      this.form.reset();
    }, err => console.error(err));
  }
  remove(task: Task): void {
    this.taskService.delete(task).subscribe(() => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      }, err => console.error(err)
      );
  }
}
