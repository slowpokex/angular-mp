import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [ ErrorPageComponent ],
  imports: [ CommonModule ],
  exports:  [ ErrorPageComponent ],
  providers: [],
})
export class ErrorModule {}
