import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notification$ = new BehaviorSubject<string | null>(null);

  show(message: string) {
    this.notification$.next(message);
  }

  hide() {
    this.notification$.next(null);
  }
}
