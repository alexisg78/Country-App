import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-Box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer= new Subject<string>()
  private debouncerSubcription?: Subscription;

  @Input()
  public placeholder: string= '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSubcription= this.debouncer
    .pipe(
      debounceTime( 400 )
    )
    .subscribe( value => {
      this.onDebounce.emit( value );
    });
  }

  ngOnDestroy(): void {
    this.debouncerSubcription?.unsubscribe();
  }

  emitValue(value: string): void {
      this.onValue.emit(value);
  }

  onKeyPress( searchTerm: string ){
    this.debouncer.next( searchTerm )
  }

}

