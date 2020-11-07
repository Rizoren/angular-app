import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface TranslateData {
  translatedText: string;
  match: number;
}

export interface TranslateResponse {
  responseData: TranslateData;
  quotaFinished?: boolean;
  mtLangSupported?: string;
  responseDetails?: string;
  responseStatus?: number;
  responderId?: string;
  exception_code?: null;
  matches?: [];
}

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  static url = 'https://api.mymemory.translated.net/';

  constructor(private http: HttpClient) { }

  get(text: string, langFrom: string, langTo: string): Observable<TranslateData> {
    return this.http
      .get<TranslateResponse>(`${TranslateService.url}get?q=${text}&langpair=${langFrom}|${langTo}`)
      .pipe(map(response => {
        if (!response) { return { translatedText: 'No matches...', match: 0 }; }
        return response.responseData;
      }));
  }
}
