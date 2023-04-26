import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CTHomeComponent} from "./components/contact-tracer/ct-home/c-t-home.component";
import {LoginComponent} from "./components/login/login.component";
import {AddPersonComponent} from "./components/contact-tracer/add-person/add-person.component";
import {BhHomeComponent} from "./components/bh-employee/bh-home/bh-home.component";

const routes: Routes = [
  {path: 'ct-home', component: CTHomeComponent},
  {path: 'bh-home', component: BhHomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'add', component: AddPersonComponent},
  {path: '**', component: CTHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
