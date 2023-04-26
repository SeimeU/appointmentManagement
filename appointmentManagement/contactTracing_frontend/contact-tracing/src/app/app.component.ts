import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService, Role} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'contact-tracing';
  role: Role | undefined;

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    console.log('test');
    this.role = this.authService.getRole();

    if (this.role === undefined) {
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['ct-home'])
    }
  }

}
