import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RegisterFormComponent } from './register/register.component';
import { RegulationsComponent } from './regulations/regulations.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { LoggedComponent } from './logged/logged.component';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardsService } from './services/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MainComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'register',
    component: RegisterFormComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'regulations',
    component: RegulationsComponent
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'logged',
    component: LoggedComponent,
    canActivate: [AuthGuardsService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardsService]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
