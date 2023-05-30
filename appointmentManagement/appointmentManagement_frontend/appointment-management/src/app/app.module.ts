import {NgModule} from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import {ToolbarModule} from "primeng/toolbar";
import {FullCalendarModule} from "@fullcalendar/angular";
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {MatGridListModule} from "@angular/material/grid-list";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatRadioModule} from "@angular/material/radio";
import {NgxMatDatetimePickerModule} from "@angular-material-components/datetime-picker";
import {NgxMatTimepickerModule} from "@angular-material-components/datetime-picker";
import {NgxMatNativeDateModule} from "@angular-material-components/datetime-picker";


import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AppointmentTableComponent } from './components/appointment-table/appointment-table.component';
import { MayorDashboardComponent } from './components/mayor-dashboard/mayor-dashboard.component';
import { AppointmentEditorComponent } from './components/appointment-editor/appointment-editor.component';
import { AppointmentCreatorComponent } from './components/appointment-creator/appointment-creator.component';
import { DailyEditorFormComponent } from './components/daily-editor-form/daily-editor-form.component';
import { WeeklyEditorFormComponent } from './components/weekly-editor-form/weekly-editor-form.component';
import { MonthlyEditorFormComponent } from './components/monthly-editor-form/monthly-editor-form.component';
import { MayorChartComponent } from './components/mayor-chart/mayor-chart.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { AppointmentSeriesTableComponent } from './components/appointment-series-table/appointment-series-table.component';
import { AppointmentSeriesEditorComponent } from './components/appointment-series-editor/appointment-series-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    AppointmentTableComponent,
    MayorDashboardComponent,
    AppointmentEditorComponent,
    AppointmentCreatorComponent,
    DailyEditorFormComponent,
    WeeklyEditorFormComponent,
    MonthlyEditorFormComponent,
    MayorChartComponent,
    AppointmentSeriesTableComponent,
    AppointmentSeriesEditorComponent,
  ],
  imports: [
    BrowserModule,
    ToolbarModule,
    FullCalendarModule,
    MatToolbarModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    HttpClientModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatGridListModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    ReactiveFormsModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
