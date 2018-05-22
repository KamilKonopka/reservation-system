import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ResourcesService} from '../services/resources.service';
import {Tools} from '../model/tools';
import {ITools} from '../interfaces/itools';
import { FormsModule, FormGroup, FormControl, Validators, ValidationErrors, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-add-resources',
  templateUrl: './add-resources.component.html',
  styleUrls: ['./add-resources.component.less']
})
export class AddResourcesComponent implements OnInit {
  tools: Tools = new Tools();
  messageSubmit  = '';
  showErrorMessage = false ;
  showSuccessMessage = false;
  addform: FormGroup;
  addformSent = false;
  modalElement: any;
  constructor(private resourcesService: ResourcesService, private router: Router) { }
  private  setupTools() {
    console.log(this.addform.value.nazwa);
    this.tools.nazwa = this.addform.value.nazwa;
    this.tools.opis = this.addform.value.opis;
    this.tools.data_prod = this.addform.value.data_prod;
    this.tools.producent = this.addform.value.producent;
    this.tools.wlasciciel = this.addform.value.wlasciciel;
    this.tools.uwagi = this.addform.value.uwagi;
  }
  ngOnInit() {
    this.addform = new FormGroup({
      nazwa: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      opis: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      data_prod: new FormControl('', [
        Validators.required,
      ]),
      producent: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      wlasciciel: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      uwagi: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
    });
    this.modalElement = document.getElementById('myModal');
  }
  onCancel() {
    this.router.navigate(['home']);
  }
  onSubmit() {
    this.addformSent = true;
    this.showErrorMessage = false;
    this.showSuccessMessage = false;
    if (this.addform.valid) {
      this.setupTools();
      this.resourcesService.addTools(this.tools).subscribe(
        res => {
          console.log(res);
          this.showSuccessMessage = true;
          this.messageSubmit = 'Dziękujemy.';
          setTimeout(() => {
            this.showSuccessMessage = false;
            this.router.navigate(['home']);
          }, 3000) ;
        },
        err => {
          this.addformSent = false;
          console.log(JSON.stringify(err));
          this.showErrorMessage = true;
          this.messageSubmit = 'Nastąpił nieoczekiwany błąd podczas zapisu.';
        },
        () => {
          console.log('Operation completed'); // this router navigate
          // () => this._router.navigate(['Home'])
        }
      );
    } else {
      console.log('Form is invalid :( !!!');
    }
  }
}

