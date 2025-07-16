import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent implements OnInit, OnDestroy {
  cartCount = 0;
  private subscription!: Subscription;
  menuOpen = false;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    // debugger;
    this.subscription = this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }


  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  hideMenu() {
    this.menuOpen = false;
  }

  signOut() {
    this.menuOpen = false;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
