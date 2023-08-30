export class User {
    userId: number = 0;
    username: string = "";
    password?: string ="";
    role: string="";
    isActive: boolean=false;
    passwordHash: string="";
    notificationsCount:number =0;

}