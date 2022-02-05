import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NumericKeyboardComponent } from './components/keyboard/keyboard.component';

@NgModule({
  exports: [ NumericKeyboardComponent],
  declarations: [NumericKeyboardComponent],
  entryComponents: [NumericKeyboardComponent],
  imports: [CommonModule, FormsModule],
})
export class NumKeyboardModule {}
