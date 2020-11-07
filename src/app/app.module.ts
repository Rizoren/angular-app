import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { SelectorComponent } from './selector/selector.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { MomentPipe } from './shared/moment.pipe';
import { TranslateComponent } from './translate/translate/translate.component';
import { TrainerComponent } from './translate/trainer/trainer.component';
import { HomeComponent } from './home/home.component';
import { AnswerComponent } from './translate/answer/answer.component';

// определение маршрутов
const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'tasks', component: OrganizerComponent},
  { path: 'translate', component: TranslateComponent },
  { path: 'trainer', component: TrainerComponent },
  { path: '**', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    SelectorComponent,
    OrganizerComponent,
    MomentPipe,
    TranslateComponent,
    TrainerComponent,
    HomeComponent,
    AnswerComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
