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
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
