import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductCardComponent } from './components/product-card/product-card.component';

@NgModule({
  declarations: [ProductCardComponent], // Declarar el componente
  imports: [CommonModule, IonicModule],
  exports: [ProductCardComponent] // Exportar el componente
})
export class SharedModule {}