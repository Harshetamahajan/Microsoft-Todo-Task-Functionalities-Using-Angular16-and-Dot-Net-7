import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Auth/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { SetReminderDialogComponent } from '../set-reminder-dialog/set-reminder-dialog.component';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  currentDate: Date = new Date(); // Initialize with the current date and time
  tasks: any[] = []; // Array to store tasks
  filteredTasks: any[] = []; // Store filtered tasks here
  showDropdown = false; // Declare the showDropdown property
  user :any;
   USER_ID: any;
  selectedTask: any = {}; // Current selected task

  constructor(private taskService: TaskService, private authSrvice:AuthService, private toast:NgToastService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Fetch tasks for the logged-in user
    // Replace USER_ID with the actual logged-in user's ID
        this.user=this.authSrvice.send();
        this.USER_ID=this.user.userId;
    this.fetchTasksForUser(this.USER_ID);
    this.startDueTimeChecks()// Initial cal
  
  }

  fetchTasksForUser(userId: number): void {
    // Fetch tasks from the API for the given user ID
    this.taskService.getTasksForUser(userId).subscribe(
      (response: any) => {
        this.tasks = response;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  createTask(task: any): void {
    // Create a task for the logged-in user
    task.userId = this.USER_ID; // Set the logged-in user's ID
    task.isCompleted=false;
    task.creationDate=new Date();
    
    console.log(task.dueDate);
    this.taskService.createTask(task).subscribe(
      (response: any) => {
        this.fetchTasksForUser(this.USER_ID); // Refresh tasks
        this.selectedTask = {}; // Clear form
        // alert("task created successfully");
        this.toast.success({detail:"SUCCESS", summary:response.message, duration:5000});

      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  // Implement other methods for update, setReminder, markCompleted, markPending, markImportant

  markCompleted(task: any): void {
    task.isCompleted = true;
    this.taskService.updateTask(task.taskId, task).subscribe(
      () => {
        console.log(task.taskId)
        this.fetchTasksForUser(this.USER_ID);
        this.toast.success({detail:"SUCCESS", summary:'marked as completed.', duration:5000});
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  markPending(task: any): void {
    task.isCompleted = false;
    this.taskService.updateTask(task.taskId, task).subscribe(
      () => {
        this.fetchTasksForUser(this.USER_ID);
        
        this.toast.success({detail:"SUCCESS", summary:'marked as Pending.', duration:5000});

      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  
  markImportant(task: any): void {
    task.isImportant = true;
    this.taskService.updateTask(task.taskId, task).subscribe(
      () => {
        this.fetchTasksForUser(this.USER_ID);
        this.toast.success({detail:"SUCCESS", summary:'marked as important.', duration:5000});

      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  updateTask(taskId: number, task: any): void {
    this.taskService.updateTask(taskId, task).subscribe(
      () => {
        console.log(taskId);
        this.fetchTasksForUser(this.USER_ID);
        this.toast.success({detail:"SUCCESS", summary:'Updated successfully.', duration:5000});

      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  deleteTask(task: any): void {
    // Assuming you have a taskService.deleteTask() method in your service
    this.taskService.deleteTask(task.taskId).subscribe(
      () => {
        console.log(task.taskId);
        this.fetchTasksForUser(this.USER_ID);
        this.toast.success({detail:"SUCCESS", summary:'Deleted successfully.', duration:5000});

      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  toggleReminderForm(task: any) {
    task.showReminderForm = !task.showReminderForm;
  }

  openReminderDialog(task: any): void {
    const dialogRef = this.dialog.open(SetReminderDialogComponent, {
      width: '300px'
    });

    // "reminderId": 1,
    // "reminderDate": "2023-08-17T12:19:26.496",
    // "isDismissed": true,
    // "taskId": 7................ setReminder() is post method need to send this filed from here
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const reminderData = {
          isDismissed: false,
          taskId: task.taskId,
          reminderDate: result
        };
    
        this.taskService.setReminder(reminderData).subscribe(() => {
          // Refresh tasks after setting reminder
          this.fetchTasksForUser(this.USER_ID);
          this.toast.success({detail:"SUCCESS", summary:'Reminder set successfully.', duration:5000});
          console.log();
        });
      }
    });
    
  }
  
  
  


  getFormattedCurrentDate(): string {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
  }

  setDefaultCreationDate(selectedDate: string): void {
    if (!selectedDate) {
      this.selectedTask.creationDate = new Date(); // Set current date if no date selected
    }
  }

  startDueTimeChecks() {
    this.checkDueTimes(); // Call it initially
    setInterval(() => {
      this.checkDueTimes();
    }, 60000); // Repeat every 60 seconds
  }
  checkDueTimes() {
    console.log('Checking due times...');
  
    const now = new Date();
    this.tasks.forEach(task => {
      console.log(`Checking task: ${task.description}`);
  
      if (task.dueDate) {
        const dueDateTime = new Date(task.dueDate);
        console.log("diff is "+dueDateTime)
        dueDateTime.setMinutes(dueDateTime.getMinutes() - 2); // Set due time 2 minutes before
        
        // Calculate the time difference in minutes between due time and current time
        const timeDifferenceInMinutes = Math.floor((dueDateTime.getTime() - now.getTime()) / (1000 * 60));
        
        if (timeDifferenceInMinutes >= -4 && timeDifferenceInMinutes <= 2) {
          console.log(`Due time achieved (within 2-minute buffer) for task: ${task.description}`);
          this.toast.info({detail:"SUCCESS", summary:`Due time achieved for task: ${task.description}`, duration:5000});

          this.displayNotification(task);
        }
      }
      
    });
  }
  
  

  // checkDueTimes() {
  //   console.log('Checking due times...');
  
  //   const now = new Date();
  //   this.tasks.forEach(task => {
  //     console.log(`Checking task: ${task.description}`);
  
  //     const dueDateTime = new Date(task.dueDate); // Convert to Date object
  //     console.log("diff is "+task.dueDate)

  //     // Check if task has the dueTime property defined
  //     if (task.dueDate) {
  //       const [hours, minutes] = task.dueTime.split(':'); // Parse hours and minutes
  //       dueDateTime.setHours(Number(hours), Number(minutes)); // Set the due time
        
  //       // Calculate the time difference in minutes between due time and current time
  //       const timeDifferenceInMinutes = Math.floor((dueDateTime.getTime() - now.getTime()) / (1000 * 60));
  //       console.log("diff is "+timeDifferenceInMinutes)
  //       if (timeDifferenceInMinutes >= 0 && timeDifferenceInMinutes <= 2) {
  //         console.log(`Due time achieved (within 2-minute buffer) for task: ${task.description}`);
  //         this.displayNotification(task);
  //       }
  //     }
  //   });
  // }
  
  
  

  displayNotification(message: string) {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          const notification = new Notification('Due Time Achieved', {
            body: message
          });
        }
      });
    }
  }

  openEditDialog(task: any): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '500px',
      data: { task }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the task with edited data
         this.updateTask(result.taskId, result);
      }
    });
  }

  
  // Method to filter tasks based on their status
  filterTasksByStatus(status: string) {
    switch (status) {
      case 'completed':
        this.fetchTasksForUser(this.USER_ID);
        this.filteredTasks = this.tasks.filter(task => task.isCompleted);
        break;
      case 'important':
        this.fetchTasksForUser(this.USER_ID);
        this.filteredTasks = this.tasks.filter(task => task.isImportant);
        break;
      case 'pending':
        this.filteredTasks = this.tasks.filter(task => !task.isCompleted && !task.isImportant);
        break;
      default:
        this.filteredTasks = this.tasks;
        break;
    }
  
    this.showDropdown = false; // Set showDropdown to false after filtering
  }
  
}