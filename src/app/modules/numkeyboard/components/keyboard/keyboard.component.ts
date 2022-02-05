import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ENTER } from '../../utils/keys';
import Layouts from '../../utils/layouts';

@Component({
  selector: 'ng-numeric-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class NumericKeyboardComponent implements OnInit {
  @Input() layout = Layouts.darts;

  @Input() disableKey: (key: string) => boolean = (_) => false;

  @Output() press = new EventEmitter<string>();

  public ENTER = ENTER;

  ngOnInit() {}

  dispatch(event: string, payload: string) {
    switch (event) {
      case 'press':
        this.press.emit(payload);
        break;
    }
  }

  clicked(key: string) {
    this.dispatch('press', key);
  }
}
