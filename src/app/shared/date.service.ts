import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment());
  constructor() { }

  addMonth(val: number): void {
    const value = this.date.value.add(val, 'month');
    this.date.next(value);
  }

  changeDate(val: moment.Moment): void {
    const value = this.date.value.set({
      date: val.date(),
      month: val.month()
    });
    this.date.next(value);
  }
}
