import { Component, Input } from '@angular/core';
import { ButtonData, MatchData } from '../../../../core/interfaces';
import { BUTTON_SIZE, BUTTON_TYPES } from '../../../../core/enums';

@Component({
  selector: 'app-match-row',
  templateUrl: './match-row.component.html',
  styleUrls: ['./match-row.component.scss']
})
export class MatchRowComponent {
  @Input() public match!: MatchData;
  public betButtonData: ButtonData = {
    type: BUTTON_TYPES.GREEN,
    size: BUTTON_SIZE.MEDIUM,
    borderRadius: 10
  };
}
