import { Component, input, output } from '@angular/core';
import { ProductItemCart } from '../../shared/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-review-items',
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './review-items.component.html',
  styleUrl: './review-items.component.css'
})
export class ReviewItemsComponent {

  productCartItem = input.required<ProductItemCart>();

  onRemove = output<string>();

  onIncrease = output<ProductItemCart>();

  onDecrease = output<ProductItemCart>();


  increaseQuantity(cartItem: any) {
    if (cartItem.quantity < cartItem.product.stock) {
      cartItem.quantity++;
    } else {
      alert('No hay suficiente stock');
    }
  }

  // Propiedades para controlar el proceso de eliminación
  isRemoving = false;
  productToRemove: any; // Producto que se está "eliminando"
  timer: any; // Referencia al temporizador
  remainingTime = 3; // Contador de 3 segundos

  // Método para manejar la acción de eliminar el producto
  onRemoveProduct(productId: string) {
    // Marca el producto para ser eliminado
    this.isRemoving = true;
    this.productToRemove = productId;
    this.remainingTime = 3; // Reinicia el tiempo a 3 segundos

    // Inicia el contador de 3 segundos
    this.timer = setInterval(() => {
      this.remainingTime--; // Decrementa el tiempo
      if (this.remainingTime <= 0) {
        this.finalizeRemoval(productId); // Si el tiempo se acaba, elimina el producto
      }
    }, 1000); // Decrementa el tiempo cada segundo
  }

  // Método para finalizar la eliminación del producto
  finalizeRemoval(productId: string) {
    clearInterval(this.timer); // Detiene el temporizador
    this.onRemove.emit(productId); // Emite el ID del producto para eliminarlo
    this.isRemoving = false; // Oculta el botón de deshacer
    this.remainingTime = 0; // Resetea el contador a 0
  }

  // Método para deshacer la eliminación
  undoRemove() {
    clearInterval(this.timer); // Cancela el temporizador
    this.isRemoving = false; // Oculta el botón de deshacer
    this.productToRemove = null; // Restablece el estado
    this.remainingTime = 0; // Resetea el contador a 0
  }

  updateQuantity(event: Event, productItem: any): void {
    const inputElement = event.target as HTMLInputElement;
    const newQuantity = parseInt(inputElement.value, 10);
  
    if (!isNaN(newQuantity) && newQuantity > 0) {
      productItem.quantity = newQuantity;
    }
  }
}
