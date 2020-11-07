import {Component, Input, OnInit} from '@angular/core';
import {Word} from '../../shared/word.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  @Input() word: Word;
  @Input() ind: number;

  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      answer: new FormControl('', Validators.required)
    });
  }

  check(): void {
    const {answer} = this.form.value;
    this.word.status = answer.toLowerCase() === this.word.word.toLowerCase();
  }
}
