import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {
  @Output() scrolled = new EventEmitter();
  @ViewChild('anchor', { static: true, read: ElementRef })
  anchor: ElementRef<HTMLElement>;
  private observer: IntersectionObserver;

  constructor(private host: ElementRef) {}

  ngOnInit(): void {
    const options: IntersectionObserverInit = {
      root: null,
      threshold: 0,
    };

    this.observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && this.scrolled.emit();
    }, options);

    this.observer.observe(this.anchor.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  get element() {
    return this.host.nativeElement;
  }
}
