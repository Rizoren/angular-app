import { Component, OnInit } from '@angular/core';
import {DateService} from '../shared/date.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {

  constructor(public dateService: DateService) { }

  ngOnInit(): void {
  }

  goTo(val: number): void {
    this.dateService.addMonth(val);
  }
}
