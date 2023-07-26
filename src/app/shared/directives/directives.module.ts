import { NgModule } from '@angular/core';
//import { ScrollBarDirective, HighlightDirective } from './common.directive';
import { NumbersOnlyDirective } from './common.directive';

@NgModule({
  imports: [],
  declarations: [NumbersOnlyDirective],
  exports: [NumbersOnlyDirective]
})
export class DirectivesModule { }