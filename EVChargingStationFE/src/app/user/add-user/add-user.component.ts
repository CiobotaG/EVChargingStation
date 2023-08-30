import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userId: any;
  user: User = new User();
  isEditMode: boolean;
  addEditUserForm!: FormGroup;
  isRegisterMode:boolean;
 
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,private authService: AuthService) { }

  ngOnInit(): void {this.isRegisterMode = this.route.snapshot.data['isRegisterMode'];
    if (!this.authService.isAdmin && !this.isRegisterMode) {
      this.router.navigate(['/home']);
    }
    this.userId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = this.route.snapshot.data['isEditMode'];
    

    if (this.isEditMode) {
      if (!this.authService.isLoggedIn) {
        this.router.navigate(['/login']);
      }
      this.getUserById();
    }
    
    
    this.addEditUserForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      isActive: [true, Validators.required],
      role: [""],
      passwordHash: [""],
      confirmPassword: ['']
    });
  }


  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
  
    if (password && confirmPassword && confirmPassword.value !== '' && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
  
    return null;
  }
  
  get addUser(): any {
    return this.addEditUserForm.controls;
  }

  addOrEditUser() {
    if (this.addEditUserForm.valid) {
      let user: User = {
        userId: !this.isEditMode ? 0 : this.userId,
        username: this.addUser.username.value,
        role: !this.isRegisterMode ? this.addUser.role.value : 'User',
        isActive:this.addUser.isActive.value,
        password:this.addUser.password.value,
        passwordHash:"",
        notificationsCount:0
      }
      if (!this.isEditMode && !this.isRegisterMode) { console.log(user)
        this.userService.addUser(user).subscribe({
          next: () => {
            this.toastr.success("User successfully added!");
            this.router.navigate(['/users']);
          },
          error: (e) => {
            if (e.status === 700) {
              this.toastr.error(e.error);
            }
          }
        });
      } else if(this.isEditMode){ console.log(user)
        this.userService.updateUser(user).subscribe({
          next: () => {
            this.toastr.success("User successfully updated!");
            this.router.navigate(['/users']);
          },
          error: () => {
             { 
              this.toastr.error("An error has occured");
            }
          }
        });
      } else { {
        console.log(user);
      
        if (this.addUser.confirmPassword.value === '') {
          this.toastr.error("Please enter a password confirmation!");
          return;
        }
      
        this.userService.addUser(user).subscribe({
          next: () => {
            this.toastr.success("User successfully created!");
      
            this.userService.login(user).subscribe({
              next: (data: any) => {
                localStorage.setItem('token', data);
                localStorage.setItem('key', user.username);
      
                this.userService.getUserByUsername(user.username).subscribe({
                  next: (resp: any) => {
                    if (resp.role == "Admin")
                      localStorage.setItem('role', resp.role);
                    else
                      localStorage.removeItem('role');
      
                    console.log(localStorage.getItem('role'))
                    this.authService.checkLoggedIn();
                  }
                });
      
                console.log(localStorage.getItem('key'))
                console.log(localStorage.getItem('token'));
                this.toastr.success("Successfully Authenticated");
      
                this.authService.checkLoggedIn();
                this.router.navigate(['/home']);
              },
              error: (error: any) => {
                this.toastr.error("Username or password is invalid");
              },
              complete: () => {
                console.log("User registration and login completed!");
              }
            });
          },
          error: (e) => {
            if (e.status === 409) {
              this.toastr.error("Username already taken, please provide another username!");
            }
          }
        });
      }

      }
    }
  }

  getUserById() {
    this.userService.getUser(this.userId).subscribe({
      next: resp => {
        this.user = {
          userId: resp.userId,
          username: resp.username,
          isActive:resp.isActive,
          role : resp.role,
          password :resp.password,
          passwordHash:resp.passwordHash,
          notificationsCount:resp.notificationsCount
        }
        console.log(this.user)
      },
      error: (e) => {
       {  e="Error";
          this.toastr.error(e.error);
        }
      }
    });
  }

}