import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LOCALE_ID} from '@angular/core';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {MainComponent} from './main/main.component';
import {FooterComponent} from './footer/footer.component';
import {CarouselComponent} from './carousel/carousel.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {RegisterFormComponent} from './register/register.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AppRoutingModule} from './app.routing.module';
import {RegulationsComponent} from './regulations/regulations.component';
import {HttpClientModule} from '@angular/common/http';
import {RegistrationService} from './services/registration.service';
import {RentalService} from './services/rental.service';
import {RegisterGridComponent} from './register-grid/register-grid.component';
import {UserDetailsComponent} from './user-details/user-details.component';
import {ContactComponent} from './contact/contact.component';
import {AuthService} from './services/auth.service';
import {LoggedComponent} from './logged/logged.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuardsService} from './services/auth-guard.service';
import {ResourcesComponent} from './resources/resources.component';
import {ResourcesService} from './services/resources.service';
import {HeaderAdminComponent} from './headerAdmin/headerAdmin.component';
import {AddResourcesComponent} from './add-resources/add-resources.component';
import {DashboardService} from './services/admin-dashboard-data';
import {UserDashboardDataService} from './services/user-dashboard-data.service';
import {RentalComponent} from './rental/rental.component';
import {ConfirmDialogContentComponent} from './rental/rental.component';
import {
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MAT_DATE_LOCALE,
    MatPaginatorIntl,
    MatListModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule
} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {DashboardAdminComponent} from './dashboardAdmin/dashboardAdmin.component';
import {DashboardUserComponent} from './dashboard-user/dashboard-user.component';
import {AdminGuardService} from './services/admin-guard.service';
import {PreviousRouteService} from './services/previous-route.service';
import {ResourcesPicturesComponent} from './resources-pictures/resources-pictures.component';
import {ImageViewerModule} from 'ngx-image-viewer';
import {LoadingComponent} from './loading/loading.component';
import {getPolishPaginatorIntl} from './utils/paginator-localize';
import {RentalsGridComponent} from './rentals-grid/rentals-grid.component';
import { ResourcesEditComponent } from './resources-edit/resources-edit.component';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import {FileUploaderService} from './services/file-uploader.service';
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
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
        ContactComponent,
        AddResourcesComponent,
        RentalComponent,
        HeaderAdminComponent,
        AddResourcesComponent,
        DashboardAdminComponent,
        DashboardUserComponent,
        ResourcesPicturesComponent,
        LoadingComponent,
        RentalsGridComponent,
        ResourcesEditComponent,
        MyReservationsComponent,
        ConfirmDialogContentComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatDatepickerModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatToolbarModule,
        MatNativeDateModule,
        MatSelectModule,
        MatOptionModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatSnackBarModule,
        ImageViewerModule.forRoot()
    ],
  entryComponents:[ConfirmDialogContentComponent],
    providers: [
      AuthService,
      AuthGuardsService,
      RegistrationService,
      ResourcesService,
      RentalService,
      DashboardService,
      UserDashboardDataService,
      AdminGuardService,
      PreviousRouteService,
      PreviousRouteService,
      FileUploaderService,
{
            provide: MAT_DATE_LOCALE,
            useValue: 'pl-PL'
        },
        {
            provide: MatPaginatorIntl,
            useValue: getPolishPaginatorIntl()
        }
    ],
    bootstrap: [AppComponent]

})
export class AppModule {
}
