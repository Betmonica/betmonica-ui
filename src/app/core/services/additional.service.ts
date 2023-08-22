import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdditionalService {

  constructor() {
  }

  public callCodeAt(targetTimeInMillis: number) {
    return new Observable((subscriber: Subscriber<undefined>) => {
      const currentTime: number = new Date().getTime();
      const timeDifference: number = targetTimeInMillis - currentTime;

      if (timeDifference > 0) {
        setTimeout(() => {
          subscriber.next();
          subscriber.complete();
        }, timeDifference);
      } else {
        subscriber.next();
        subscriber.complete();
      }
    });
  }

}
