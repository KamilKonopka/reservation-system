import { Component, OnInit } from '@angular/core';
import { VERSION, MatSnackBar } from '@angular/material';
import { RentalService } from '../services/rental.service';
import { Rental } from '../model/rental';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';
import { ResourcesService } from '../services/resources.service';
import { ITools } from '../interfaces/itools';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from '@angular/material';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dialog-content',
  templateUrl: 'dialog-content.html',
})
export class ConfirmDialogContentComponent {}


@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.less'],
  entryComponents: [ ConfirmDialogContentComponent ]
})

export class RentalComponent implements OnInit {
  selected_resource_id = '';
  rental_id: string;
  allResources: Observable<Array<ITools>>;
  minDate = new Date();
  maxDate = new Date(this.minDate.getUTCFullYear() + 1, this.minDate.getMonth() === 2 && this.minDate.getDay() === 29 ? 3 : this.minDate.getMonth(),
    this.minDate.getMonth() === 2 && this.minDate.getDay() === 29 ? 1 : this.minDate.getDay());
  startDate = this.minDate;
  endDate = this.minDate;
  godz_od = this.rentalService.stringTime(new Date());
  godz_do = this.godz_od;
  start_godz = this.godz_od;
  user: User;
  rental: Rental;
  isBusy = false;
  isInsertMode = true;
  prompt = 'Nowa rezerwacja';
  currentResourceRentals: Array<Rental>;
  constructor(private location: Location, private snackBar: MatSnackBar, public dialog: MatDialog, private rentalService: RentalService, private authService: AuthService, private resourcesService: ResourcesService, private route: ActivatedRoute, private router: Router, ) { }


  selectedResourcesChanged = () => {
    this.rentalService.getRentalsByResourceId(this.selected_resource_id).subscribe(x => {
      this.currentResourceRentals = x;
    });

  }


  ngOnInit() {

    this.selected_resource_id = this.route.snapshot.paramMap.get('resourceId');
    this.rental_id =  this.route.snapshot.paramMap.get('rentalId');
    this.user = JSON.parse(localStorage.getItem('profile'));

    if (this.rental_id != null && this.rental_id.length > 1){
      this.rental = new Rental();
      this.isInsertMode  = false;
      this.prompt = 'Rezerwacja';
      this.rentalService.getRentalById(this.rental_id).subscribe(res => {
        this.rental = res;
        this.selected_resource_id = res.zasob[0]['_id'];
        this.startDate = this.rental.data_wypozyczenia;
        this.endDate = this.rental.data_zwrotu;
        this.godz_od = this.rentalService.stringTime(new Date(this.rental.data_wypozyczenia));
        this.godz_do = this.rentalService.stringTime(new Date(this.rental.data_zwrotu));
        this.selectedResourcesChanged();
        }
      );
    } else {
      this.rental = this.rentalService.setupNewRental(this.user[0]._id, null);
    }
    this.allResources = this.resourcesService.resources$;
    if (this.selected_resource_id) {
      this.selectedResourcesChanged();
    }
  }
  confirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogContentComponent, {
      height: '180px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rental.anulowana = true;
        this.rentalService.updateRental(this.rental).subscribe(res => {
          const snackBarRef = this.snackBar.open('Rezerwacja została anulowana', '', {
            duration: 2000,
          });
          snackBarRef.afterDismissed().subscribe(() => {
            this.location.back();
          });
        }, error2 => { console.log('Błąd podczas zapisu ' + error2.toString()); }
        );
      }
    });
  }

  onSubmit() {
    this.rental.rezerwacja = true;
    this.rental.data_wypozyczenia = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate(),
      Number(this.godz_od.substring(0, 2)), Number(this.godz_od.substring(2, 4)));
    this.rental.data_zwrotu = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate(),
      Number(this.godz_do.substring(0, 2)), Number(this.godz_do.substring(2, 4)));
    this.rental.zasob.push(this.selected_resource_id);

    var isValid = true;
    if(this.rental.data_wypozyczenia >= this.rental.data_zwrotu){
      isValid = false;
    }
console.log("Zapis");
    this.currentResourceRentals.forEach(reservation => {
      reservation.data_wypozyczenia = new Date(reservation.data_wypozyczenia);
      //console.log(reservation.data_wypozyczenia);
      reservation.data_zwrotu = new Date(reservation.data_zwrotu);
      if(reservation.data_wypozyczenia <= this.rental.data_zwrotu && this.rental.data_wypozyczenia <= reservation.data_zwrotu){
        isValid = false;
      }
    });

    if(!isValid){

      this.snackBar.open('Wybrany zasób jest zarezerwowany w tym terminie lub podane daty są niewłaściwe.', '', {
        duration: 2000,
      });
      return;
    }
    this.isBusy = true;
    this.rentalService.addRental(this.rental).subscribe(
      res => {
          const snackBarRef = this.snackBar.open('Zarezerwowano zasób!', '', {
            duration: 2000,
          });
          snackBarRef.afterDismissed().subscribe(() => {
            this.location.back();
          });
          return;

        //this.showSuccessMessage = true;
        //this.messageSubmit = 'Dziękujemy za złożenie wniosku o rejestrację. Skontaktujemy się po jego akceptacji.';
        //setTimeout(() => {
        //  this.showSuccessMessage = false;
        //th.is.router.navigate(['logged/resources']);
        // }, 3000) ;
      },
      err => {
        // this.formSent = false;
        console.log(JSON.stringify(err));
        // this.showErrorMessage = true;
        // this.messageSubmit = 'Nastąpił nieoczekiwany błąd podczas zapisu wniosku.  ' ;
        // setTimeout(() => {    //<<<---    using ()=> syntax
        //   this.showMessage = false;
        // }, 3000);
      },
      () => {
        this.isBusy = false;
      }

    );
  }
  onCancel() {
    this.location.back();
  }
}

