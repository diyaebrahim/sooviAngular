import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';
@Injectable()
export class VersionCheckService {
    // this will be replaced by actual hash post-build.js
    private currentHash = '{{POST_BUILD_ENTERS_HASH_HERE}}';
    private updateAvailable: boolean = false;
    constructor(private http: HttpClient, private toastrService: NbToastrService) { }
    /**
    * Checks in every set frequency the version of frontend application
    * @param url
    * @param {number} frequency - in milliseconds
    */
    public initVersionCheck(url, frequency = 1000 * 60 * 3) {
        setInterval(() => {
            this.checkVersion(url);
            this.update();
        }, frequency);
        this.checkVersion(url);
    }

    private update() {
        if (this.updateAvailable) {
            this.updateAvailable = false;
            setTimeout(() => {
                this.toastrService.show(
                    'There is a new version discovered! You only have one minute before your browser forces the update.',
                    'One minute for update', { status: 'info', duration: 1000 * 30 });
                setTimeout(() => {
                    this.toastrService.show(
                        'You only have 30 seconds before your browser forces the update! Hurry up',
                        '30 Seconds for update', { status: 'warning', duration: 1000 * 20 });
                    setTimeout(() => {
                        this.toastrService.show(
                            'Time\'s up! See you in the next update, bye.',
                            'Time\'s up!', { status: 'danger', duration: 1000 * 5 });
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000 * 5);
                    }, 1000 * 5);
                }, 1000 * 20);
            }, 1000 * 30);
        }
    }
    /**
    * Will do the call and check if the hash has changed or not
    * @param url
    */
    private checkVersion(url) {
        // timestamp these requests to invalidate caches
        this.http.get(url + '?t=' + new Date().getTime())
            .subscribe(
                (response: any) => {
                    const hash = response.hash;
                    const hashChanged = this.hasHashChanged(this.currentHash, hash);
                    // If new version, do something
                    if (hashChanged) {
                        this.updateAvailable = true;
                    }
                    // store the new hash so we wouldn't trigger versionChange again
                    // only necessary in case you did not force refresh
                    this.currentHash = hash;
                },
                (err) => {
                    console.error(err, 'Could not get version');
                }
            );
    }
    /**
    * Checks if hash has changed.
    * This file has the JS hash, if it is a different one than in the version.json
    * we are dealing with version change
    * @param currentHash
    * @param newHash
    * @returns {boolean}
    */
    private hasHashChanged(currentHash, newHash) {
        if (!currentHash || currentHash === '{{POST_BUILD_ENTERS_HASH_HERE}}') {
            return false;
        }
        return currentHash !== newHash;
    }
}