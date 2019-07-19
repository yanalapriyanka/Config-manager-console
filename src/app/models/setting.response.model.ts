import {Setting} from './setting.model';
export class SettingResponse{
    Data: Setting[];   
    Success: boolean;
    Message : string;
    ErrorDetails : string[];
    StatusCode: number
}
