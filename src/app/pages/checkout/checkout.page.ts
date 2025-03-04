import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss']
})
export class CheckoutPage implements OnInit {
  checkoutForm: FormGroup;
  total: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      accountNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.total = this.cartService.getTotal();
  }

  async onSubmit() {
    if (this.checkoutForm.invalid) {
      this.presentToast('Please fill all fields correctly');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Processing payment...',
      duration: 3000
    });
    await loading.present();

    setTimeout(async () => {
      await loading.dismiss();
      this.cartService.clearCart();
      this.router.navigate(['/order-summary'], {
        state: {
          personalInfo: this.checkoutForm.value,
          paymentInfo: this.checkoutForm.value,
          total: this.total
        }
      });
      this.presentToast('Payment processed successfully');
    }, 3000);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}