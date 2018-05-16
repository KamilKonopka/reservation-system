import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeaderAdminComponent } from './headerAdmin/headerAdmin.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RegisterFormComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app.routing.module';
import { RegulationsComponent } from './regulations/regulations.component';
import { HttpClientModule } from '@angular/common/http';
import {RegistrationService} from './services/registration.service';
import { RegisterGridComponent } from './register-grid/register-grid.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ContactComponent } from './contact/contact.component';
import { AuthService } from './services/auth.service';
import { LoggedComponent } from './logged/logged.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardsService } from './services/auth-guard.service';
import { ResourcesComponent } from './resources/resources.component';
import {ResourcesService} from './services/resources.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderAdminComponent,
    MainComponent,
    FooterComponent,
    CarouselComponent,
    AboutUsComponent,
    RegisterFormComponent,
    RegulationsComponent,
    PageNotFoundComponent,
    RegisterGridComponent,
    UserDetailsComponent,
    LoggedComponent,
    ProfileComponent,
    ResourcesComponent,
    ContactComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuardsService, RegistrationService, ResourcesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
