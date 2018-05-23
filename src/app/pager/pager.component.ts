// http://michaelbromley.github.io/ngx-pagination/#/advanced

import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { NgxPaginationModule, PaginationInstance } from 'ngx-pagination';
import { StringFilterPipe } from './string-filter.pipe';

import { MealsService } from '../providers/meals.service';
// import { Highlighter } from '../providers/highlighter.service';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})

export class PagerComponent implements OnInit {

  @Input('data') meals: string[] = [];

  public filter: string = '';
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1
  };

  constructor(
    // private highlighter: Highlighter,
    private mealsService: MealsService) {
    this.meals = mealsService.getMeals();
  }

  public labels: any = {
    previousLabel: 'Previous',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };

  private popped = [];

  onPageChange(number: number) {
    console.log('change to page', number);
    this.config.currentPage = number;
  }

  pushItem() {
    let item = this.popped.pop() || 'A newly-created meal!';
    this.meals.push(item);
  }

  popItem() {
    this.popped.push(this.meals.pop());
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.highlighter.highlight();
  }
}
