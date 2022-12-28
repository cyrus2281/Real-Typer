import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import realType from './utils/RealTyperUtils';

/**
 *   RealTyper for Angular
 *
 *   An Angular component that gives the effect of typing for texts
 *
 *   [Doc](https://github.com/cyrus2281/Real-Typer/tree/main/src/Angular/projects/real-typer#readme)
 *
 *   [Github](https://github.com/cyrus2281)
 *
 */
@Component({
  selector: 'real-typer',
  template:
  `
  <div #typer [ngStyle]="styles"></div>
  `,
  styles: []
})
export class RealTyperComponent implements AfterViewInit {
  @Input() strings !: string | string[];
  @Input() cursorCharacter : string = "|";
  @Input() typeSpeed: number = 100;
  @Input() deleteSpeed: number = 50;
  @Input() holdDelay: number = 1500;
  @Input() pauseDelay: number = 1000;
  @Input() startDelay: number = 0;
  @Input() delete: boolean = true;
  @Input() deleteLastString: boolean = true;
  @Input() loop: boolean = true;
  @Input() loopHold: number = 1500;
  @Input() loopStartIndex: number = 0;
  @Input() callback !: Function;
  @Input() callbackArgs !: any;
  @Input() styles !: {};
  @Input() developerMode: boolean = true;

  @Output() callBackOutput: EventEmitter<any> = new EventEmitter();

  @ViewChild('typer') typerRef !: ElementRef;
  private typer !: HTMLDivElement;

  ngAfterViewInit(): void {
    this.typer = this.typerRef.nativeElement;
    this.type();
  }

  setOutput = (string: string) => {
    this.typer.textContent = string
  }

  eventBasedCallback = (args: any) => {
    if (!!this.callback) {
      this.callBackOutput.emit(this.callback(this.callbackArgs));
    }
  }

  type(): void {
    realType({
      strings: this.strings,
      cursorCharacter: this.cursorCharacter,
      typeSpeed: this.typeSpeed,
      deleteSpeed: this.deleteSpeed,
      holdDelay: this.holdDelay,
      pauseDelay: this.pauseDelay,
      startDelay: this.startDelay,
      delete: this.delete,
      deleteLastString: this.deleteLastString,
      loop: this.loop,
      loopHold: this.loopHold,
      loopStartIndex: this.loopStartIndex,
      callback: this.eventBasedCallback,
      callbackArgs: this.callbackArgs,
      developerMode: this.developerMode,
    }, this.setOutput);
  }
}
