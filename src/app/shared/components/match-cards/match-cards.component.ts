import { Component, Input } from '@angular/core';
import { MatchData } from '../../../core/interfaces';

@Component({
  selector: 'app-match-cards',
  templateUrl: './match-cards.component.html',
  styleUrls: ['./match-cards.component.scss']
})
export class MatchCardsComponent {
  @Input() matches: MatchData[] = [];
}
