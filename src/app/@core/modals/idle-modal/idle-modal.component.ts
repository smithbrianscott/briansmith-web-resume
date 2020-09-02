import { Component, OnInit } from '@angular/core';
import { IdleConfig } from '../../config/idle-config';

@Component({
    selector: 'tgh-idle-modal',
    templateUrl: 'idle-modal.component.html'
})

export class IdleModalComponent implements OnInit {

    countdown: number;
    minutes: number;
    seconds: number;

    constructor() {
        
     }

    ngOnInit() { }

    calculateTimeRemaining(secondsRemaining: number) {
        this.minutes = Math.floor(secondsRemaining / 60);
        this.seconds = secondsRemaining - this.minutes * 60;
        
        if (this.minutes > 0) {
            return this.minutes + ":" + (this.seconds > 9 ? this.seconds : '0' + this.seconds);
        }
        else {
            return this.seconds + ' seconds';
        }
    }

    getStyle(value: number) {
        return ((value) / IdleConfig.timeout * 100) + "%";
    }
}