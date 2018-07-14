import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderByPipe } from './order-by/order-by.pipe';
import {FilterCardPipe} from './filter-card/filter-card.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    OrderByPipe,
    FilterCardPipe
  ],
  exports: [
    OrderByPipe,
    FilterCardPipe
  ]
})
export class PipesModule {}
