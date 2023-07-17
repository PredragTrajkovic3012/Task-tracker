import { Component, OnInit } from '@angular/core'

import { Task } from '../../Task'
import { TaskService } from 'src/app/services/task.service'

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
    tasks: Task[] = []
    constructor(private taskService: TaskService) {}

    ngOnInit(): void {
        this.taskService.getTasks().subscribe(tasksFromAPI => (this.tasks = tasksFromAPI))
    }
    deleteTask(deltedTask) {
        this.taskService.deleteTask(deltedTask).subscribe(() => (this.tasks = this.tasks.filter(t => t.id !== deltedTask.id)))
    }
    toggleReminder(task: Task) {
        task.reminder = !task.reminder
        this.taskService.updateTaskReminder(task).subscribe()
    }
    addTask(task:Task){
      this.taskService.addTask(task).subscribe(task =>{
        this.tasks.push(task)
      })

    }
}

