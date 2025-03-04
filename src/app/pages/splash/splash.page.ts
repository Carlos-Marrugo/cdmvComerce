import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
     //3sec
     setTimeout(() => {
      this.router.navigate(['/home']);
    }, 5000);
  }

}
