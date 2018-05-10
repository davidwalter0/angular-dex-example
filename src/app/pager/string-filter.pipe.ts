import { NgModule, Pipe, PipeTransform } from "@angular/core";

/**
 * A simple string filter, since Angular does not yet have a filter pipe built in.
 */

@Pipe({ name: 'stringFilter' })
export class StringFilterPipe implements PipeTransform {

  transform(value: string[], q: string) {
    if (!q || q === '') {
      return value;
    }
    return value.filter(item => -1 < item.toLowerCase().indexOf(q.toLowerCase()));
  }
}

@NgModule({
  imports: [],
  declarations: [],
  providers: [StringFilterPipe],
  exports: [],
})
export class StringFilterModule { }

