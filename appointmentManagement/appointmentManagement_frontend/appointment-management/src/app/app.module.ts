import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ToolbarModule} from "primeng/toolbar";
import { CalendarComponent } from './components/calendar/calendar.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppointmentTableComponent } from './components/appointment-table/appointment-table.component';
import { MatTableModule} from "@angular/material/table";
import { MayorDashboardComponent } from './components/mayor-dashboard/mayor-dashboard.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import { AppointmentEditorComponent } from './components/appointment-editor/appointment-editor.component';
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {MatGridListModule} from "@angular/material/grid-list";
import {FormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { AppointmentCreatorComponent } from './components/appointment-creator/appointment-creator.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    AppointmentTableComponent,
    MayorDashboardComponent,
    AppointmentEditorComponent,
    AppointmentCreatorComponent
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
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
