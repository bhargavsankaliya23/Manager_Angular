import { NgModule } from '@angular/core';
import { ArraySortPipe, GroupByPipe, NiceDateFormatPipe, NiceTimePipe } from './common.pipe';

@NgModule({
  imports: [],
  declarations: [NiceTimePipe, GroupByPipe, ArraySortPipe, NiceDateFormatPipe],
  exports: [NiceTimePipe, GroupByPipe, ArraySortPipe, NiceDateFormatPipe]
})
export class PipeModule { }
