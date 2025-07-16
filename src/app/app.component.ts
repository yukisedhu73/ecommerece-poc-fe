import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopBarComponent } from "./components/shared/top-bar/top-bar.component";
import { SideBarComponent } from "./components/shared/side-bar/side-bar.component";
import { NotificationComponent } from './components/shared/notification/notification.component';
import { LoadingService } from './services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, TopBarComponent, SideBarComponent, NotificationComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'adhash-ecommerce-fe';
  constructor(public loadingService: LoadingService) { }
}
