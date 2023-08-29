import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskComponent } from './task/task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { SetReminderDialogComponent } from './set-reminder-dialog/set-reminder-dialog.component';


@NgModule({
  declarations: [
    DashboardComponent,
    TaskComponent,
    EditTaskDialogComponent,
    SetReminderDialogComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
