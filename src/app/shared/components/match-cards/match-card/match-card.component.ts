import { Component, Input } from '@angular/core';
import { MatchData } from '../../../../core/interfaces';

@Component({
  selector: 'app-match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss']
})
export class MatchCardComponent {
  @Input() matchData!: MatchData;
}
