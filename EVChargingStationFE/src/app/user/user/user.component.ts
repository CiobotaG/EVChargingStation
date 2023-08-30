import { Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteconfirmationComponent } from 'src/app/deleteconfirmation/deleteconfirmation.component';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {

  users:any;
  currentUser:any;
  theuserId:number;
  dataSource: MatTableDataSource<any> = new MatTableDataSource;
  columnsToDisplay: string[] = ["username","role","isActive","actions"];
  @ViewChild(MatPaginator) paginator!:MatPaginator;

  constructor(private authService:AuthService,private router:Router,private userService: UserService,public dialog: MatDialog,private toastr: ToastrService) {
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
    }
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onDelete(user: User): void {
    this.deleteUser(user,user.userId);
  }

  deleteUser( user: any, id: number): void {
    const dialogRef = this.dialog.open(DeleteconfirmationComponent);
    dialogRef.componentInstance.message = "Are you sure you want to delete this user ?";
    this.currentUser = user;
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.deleteUserConfirmed();
    });
  }

  deleteUserConfirmed(): void {
    this.userService.deleteUser(this.currentUser.id).subscribe({
      next: resp => {
        this.toastr.info("User succesfully deleted");
        this.getUsers();
      },
      error: error => {
        error="User was not deleted";
        this.toastr.info(error);
      }
    });
  }
  
  
  getUsers() {
    this.userService.getAllUsers().subscribe({
      next: resp => {
        console.log(resp);
        this.users = resp;
        this.dataSource.data = resp;
      },
      error: error => {
        console.log(error)
      }
    })
  }
}
