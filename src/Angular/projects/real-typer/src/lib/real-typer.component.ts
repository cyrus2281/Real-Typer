import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import realType, { realTyperDefaultProps } from './utils/RealTyperUtils';

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
  templateUrl: './real-typer.component.html',
  styleUrls: ['./real-typer.component.css'],
})
export class RealTyperComponent implements AfterViewInit {
  @Input() strings!: string | string[];
  @Input() cursorCharacter: string = realTyperDefaultProps.cursorCharacter;
  @Input() cursorBlink: boolean = realTyperDefaultProps.cursorBlink;
  @Input() typeSpeed: number = realTyperDefaultProps.typeSpeed;
  @Input() deleteSpeed: number = realTyperDefaultProps.deleteSpeed;
  @Input() holdDelay: number = realTyperDefaultProps.holdDelay;
  @Input() pauseDelay: number = realTyperDefaultProps.pauseDelay;
  @Input() startDelay: number = realTyperDefaultProps.startDelay;
  @Input() delete: boolean = realTyperDefaultProps.delete;
  @Input() deleteLastString: boolean = realTyperDefaultProps.deleteLastString;
  @Input() loop: boolean = realTyperDefaultProps.loop;
  @Input() loopHold: number = realTyperDefaultProps.loopHold;
  @Input() loopStartIndex: number = realTyperDefaultProps.loopStartIndex;
  @Input() developerMode: boolean = realTyperDefaultProps.developerMode;
  @Input() callback!: Function;
  @Input() callbackArgs!: any;
  @Input() styles!: {};

  @Output() callBackOutput: EventEmitter<any> = new EventEmitter();

  public typerOutput: string = '';

  ngAfterViewInit(): void {
    this.type();
  }

  setOutput = (string: string) => {
    this.typerOutput = string;
  };

  eventBasedCallback = (args: any) => {
    if (!!this.callback) {
      this.callBackOutput.emit(this.callback(this.callbackArgs));
    }
  };

  type(): void {
    realType(
      {
        strings: this.strings,
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
      },
      this.setOutput
    );
  }
}
