import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RegisterFormComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app.routing.module';
import { RegulationsComponent } from './regulations/regulations.component';
import { HttpClientModule } from '@angular/common/http';
import {RegistrationService} from './services/registration.service';
import { RegisterGridComponent } from './register-grid/register-grid.component';
import { RegisterGridRowComponent } from './register-grid-row/register-grid-row.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    LoginComponent,
    CarouselComponent,
    AboutUsComponent,
    RegisterFormComponent,
    RegulationsComponent,
    PageNotFoundComponent,
    RegisterGridComponent,
    RegisterGridRowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [RegistrationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
