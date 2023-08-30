import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(private authService:AuthService){}

    get HideRoleNotAdmin(): boolean {
      return this.authService.isAdmin;
    }
}
