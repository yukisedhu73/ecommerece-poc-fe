import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../services/notification.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notification" *ngIf="notificationService.notification$ | async as message">
      <div class="notification-content">
        <span>{{ message }}</span>
        <button (click)="close()">×</button>
      </div>
    </div>
  `,
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnDestroy {
  private autoCloseSub?: Subscription;

  constructor(public notificationService: NotificationService) {
    this.notificationService.notification$.subscribe((message) => {
      if (message) {
        // Start/reset the auto-close timer
        this.startAutoCloseTimer();
      }
    });
  }

  startAutoCloseTimer() {
    this.autoCloseSub?.unsubscribe();
    // Start a 4-second timer
    this.autoCloseSub = timer(4000).subscribe(() => {
      this.notificationService.hide();
    });
  }

  // Manual close and cancel timer
  close() {
    this.autoCloseSub?.unsubscribe();
    this.notificationService.hide();
  }

  ngOnDestroy() {
    this.autoCloseSub?.unsubscribe();
  }
}
