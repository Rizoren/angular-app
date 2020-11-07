import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '../../shared/translate.service';
import {TrainWord, WordService} from '../../shared/word.service';
import {DateService} from '../../shared/date.service';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {

  formT: FormGroup;
  translatedText: string;
  availLang: string[] = ['RU', 'EN', 'FR'];

  constructor(private translateService: TranslateService,
              private wordService: WordService,
              private dateService: DateService) { }

  ngOnInit(): void {
    this.formT = new FormGroup({
      textForTranslate: new FormControl('', Validators.required),
      fromLang: new FormControl('RU', Validators.required),
      toLang: new FormControl('EN', Validators.required)
    });
  }

  submit(): void {
    const {textForTranslate} = this.formT.value;
    const {fromLang} = this.formT.value;
    const {toLang} = this.formT.value;

    textForTranslate.split(',').map(word => word.trim()).forEach(word => {
      this.translateService.get(word, fromLang, toLang).subscribe(response => {
        this.translatedText = response.translatedText;

        const newWord: TrainWord = {
          word,
          lang: fromLang,
          status: false,
          date: this.dateService.date.value.format('DD-MM-YYYY'),
          translate: [
            {
              word: response.translatedText,
              status: false,
              lang: toLang,
            }
          ]
        };
        this.wordService.create(newWord).subscribe(() => {
          this.formT.patchValue({textForTranslate: ''});
        }, err => console.error(err));
      }, err => console.error(err));
    });
  }

}
