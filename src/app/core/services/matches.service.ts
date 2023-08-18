import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, map, Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { EnvironmentService } from './environment.service';
import { MatchesResponse, Response } from '../interfaces';
import { MATCH_STATUSES } from '../enums';
import { SetMatches } from '../../store/actions/matches.actions';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  private readonly MATCH_AUTO_UPDATE = 1000 * 60 * 5; // 5 minutes

  constructor(private http: HttpClient, private environmentService: EnvironmentService, private store: Store) {
  }

  public autoUpdateMatches(): Observable<number> {
    this.getMatches();

    return interval(this.MATCH_AUTO_UPDATE).pipe(map((value: number) => {
      this.getMatches();
      return value;
    }));
  }

  public getMatches(status: MATCH_STATUSES = MATCH_STATUSES.UPCOMING) {
    this.getMatchesRequest(status).subscribe({
      next: (response: Response<MatchesResponse>) => {
        if (response.success) {
          this.store.dispatch(new SetMatches(response.data.matches));
        }
      }
    });
  }

  private getMatchesRequest(status: MATCH_STATUSES = MATCH_STATUSES.UPCOMING): Observable<Response<MatchesResponse>> {
    return this.http.get<Response<MatchesResponse>>(`${this.environmentService.environment.apiUrl}/matches/get`, {
      params: {
        status
      }
    });
  };
}
