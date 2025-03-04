import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-order-summary',
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss']
})
export class OrderSummaryPage implements OnInit {
  personalInfo: any = {
    name: '',
    lastName: '',
    country: '',
    city: '',
    address: ''
  };

  paymentInfo: any = {
    accountNumber: '',
    cvc: '',
    dueDate: ''
  };

  total: number = 0;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.personalInfo = navigation.extras.state['personalInfo'];
      this.paymentInfo = navigation.extras.state['paymentInfo'];
      this.total = navigation.extras.state['total'];
    }
  }

  ngOnInit() { }

  goHome() {
    this.router.navigate(['/home']);
  }
}