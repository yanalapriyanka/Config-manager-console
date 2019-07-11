import { Injectable } from '@angular/core';

@Injectable()
export class Utility {
    public formatString(msgString: string, placeHolders: any[]): string {
        let result = msgString;
        for (var arg in placeHolders) {
            result = result.replace("{" + arg + "}", placeHolders[arg])
        }
        return result;
    }
}
