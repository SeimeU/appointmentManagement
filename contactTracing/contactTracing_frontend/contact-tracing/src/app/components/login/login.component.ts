import {Component} from '@angular/core';
import {AuthService, Role} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router, private authService: AuthService) {
  }

  selectRole(role: Role) {
    this.authService.setRole(role);
    if (role === "CT") {
      this.router.navigate(['ct-home']);
    } else {
      this.router.navigate(['bh-home']);
    }
  }

}
