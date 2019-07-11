import { DeploymentUnit } from './deploymentunit.model';

export class DeploymentUnitResponse{
    Data: DeploymentUnit[];   
    Success: boolean;
    Message : string;
    ErrorDetails : string[];
    StatusCode: number
}
