import {Environment} from './environment.model';
export class EnvironmentResponse{
    Data: Environment[];   
    Success: boolean;
    Message : string;
    ErrorDetails : string[];
    StatusCode: number
}
