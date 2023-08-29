import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent {
  editedTask: any;

  constructor(
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Clone the task data to avoid modifying the original
    this.editedTask = { ...data.task };
  }

  onSave(): void {
    this.dialogRef.close(this.editedTask);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}