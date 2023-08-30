import { Station } from "./station.model";

export class Maintenance {
    id: number = 0;
    station: Station | null = null;
    description:string="";
    outcome:string="";
    status:string="";
    lastMaintenanceDate: any;
    nextMaintenanceDate:any;
}