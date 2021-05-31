import { Injectable } from '@angular/core';
import { timer, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UpdateAppService {

    constructor() { }

    public initVersionCheck(frequency = 1000 * 60 * 5) {
        setInterval(() => {
            this.update();
        }, frequency);
    }
    update(){

    }

}
