import { Component, OnInit } from '@angular/core';
import {TrainWord, WordService} from '../../shared/word.service';
import {DateService} from '../../shared/date.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {

  words: TrainWord[] = [];

  constructor(public dateService: DateService,
              private wordService: WordService) { }

  ngOnInit(): void {
    this.dateService.date.pipe(
      switchMap(value => this.wordService.read(value))
    ).subscribe(words => {
      this.words = words;
    });
  }
}
