import { Component, EventEmitter, AfterViewInit } from '@angular/core';

type EmitterInput = {
  input: string;
  index?: undefined | number | true;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent implements AfterViewInit {
  emitter: EventEmitter<EmitterInput> = new EventEmitter();
  title = 'real-typer-angular';



  ngAfterViewInit(): void {
    this.emitter.emit({ input: 'New Message' });
  }
}
