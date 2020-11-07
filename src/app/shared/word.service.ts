import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface Word {
  id?: string;
  word: string;
  lang: string;
  status: boolean;
  date?: string;
}

export interface TrainWord extends Word {
  translate?: Word[];
}

interface CreateResponse {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class WordService {

  static url = 'https://organizer-ang.firebaseio.com/words';

  public s: TrainWord[] = [{ lang: 'ru', word: 'Привет', status: false,
    translate: [
      { lang: 'en', word: 'Hello', status: false },
      { lang: 'fr', word: 'Bonjur', status: false }
    ] }];

  constructor(private http: HttpClient) { }

  create(word: TrainWord): Observable<TrainWord> {
    return this.http
      .post<CreateResponse>(`${WordService.url}/${word.date}.json`, word)
      .pipe(map(res => {
        return {...word, id: res.name};
      }));
  }

  read(date: moment.Moment): Observable<TrainWord[]> {
    return this.http
      .get<TrainWord[]>(`${WordService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(map((words) => {
        if (!words) { return []; }
        const wordsArr = Object.keys(words).map(key => ({...words[key], id: key}));
        wordsArr.map(word => {
          if (!word.translate) { return []; }
          word.translate = Object.keys(word.translate).map(key => ({...word.translate[key], id: key}));
        });
        return wordsArr;
      }));
  }


}
