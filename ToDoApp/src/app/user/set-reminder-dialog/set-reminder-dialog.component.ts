import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-set-reminder-dialog',
  templateUrl: './set-reminder-dialog.component.html',
  styleUrls: ['./set-reminder-dialog.component.css']
})
export class SetReminderDialogComponent {
  reminderDate: Date = new Date();

  constructor(public dialogRef: MatDialogRef<SetReminderDialogComponent>) {}

  onSave(): void {
    this.dialogRef.close(this.reminderDate);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
