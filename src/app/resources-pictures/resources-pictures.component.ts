import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ResourcesService} from '../services/resources.service';
import {CustomEvent} from 'ngx-image-viewer';
import {IUser} from '../interfaces/iuser';
import {PreviousRouteService} from '../services/previous-route.service';
import {FileUploaderService} from '../services/file-uploader.service';
import {IPictures} from '../interfaces/ipictures';
import {Tools} from '../model/tools';

const mediaUrl = 'https://ecommunity-80ee.restdb.io/media/';

@Component({
    selector: 'app-resources-pictures',
    templateUrl: './resources-pictures.component.html',
    styleUrls: ['./resources-pictures.component.less']
})
export class ResourcesPicturesComponent implements OnInit {

    profileData: IUser[];

    resource = new Tools();
    resourceCheck = new Tools();
    messageSubmit = '';
    messageSubmitDel = '';
    showErrorMessage = false;
    showErrorMessageDel = false;
    showSuccessMessage = false;
    showSuccessMessageDel = false;
    showEditButtons: boolean;
    private id: string;
    public pictures: IPictures[];
    public numberOfPictures: number;
    public imagesUrl = new Array();
    public imgIndex: string;
    selectedFile: File = null;
    addPictureShow: boolean;
    loaded;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private resService: ResourcesService,
        public previousRouteService: PreviousRouteService,
        private fileUploaderService: FileUploaderService,
    ) {
    }

    getPictures(id) {
        this.resService.getPictures(id).subscribe(pics => {
            this.pictures = pics;
            this.numberOfPictures = Object.keys(this.pictures).length;
            if (this.numberOfPictures > 0) {
                for (let i = 0; i < this.numberOfPictures; i++) {
                    this.imagesUrl.push(mediaUrl + this.pictures[i].zdjecie);
                }
            }

        }, err => {
            console.log(JSON.stringify(err));
        }, () => {
            this.loaded = true;
        });

    }

    goBack() {
        this.location.back();
    }

    handleEvent(event: CustomEvent) {
        this.imgIndex = `${event.valueOf()}`;
    }

    onFileSelected(event) {
        this.selectedFile = event.target.files[0];
    }

    onUpload() {
        this.fileUploaderService.addPicture(this.selectedFile, this.resource.opis, this.id).subscribe(data => {

                // console.log(data);
                this.showSuccessMessage = true;
                this.messageSubmit = 'Dziękujemy.';
                setTimeout(() => {
                    this.showSuccessMessage = false;
                    this.addPictureShow = false;
                    this.loaded = false;
                    this.imagesUrl.length = 0;
                    this.getPictures(this.id);
                    this.imgIndex = '0';
                }, 3000);
            }, err => {
                console.log(JSON.stringify(err));
                this.showErrorMessage = true;
                this.messageSubmit = 'Nastąpił nieoczekiwany błąd podczas zapisu zdjęcia.';
            }
        );
    }

    onSubmit() {
        this.resService.updatePictureDescription(
            this.pictures[this.imgIndex]._id,
            this.pictures[this.imgIndex].opis).subscribe(
            res => {
                // console.log(res);
                this.showSuccessMessage = true;
                this.messageSubmit = 'Dziękujemy.';
                setTimeout(() => {
                    this.showSuccessMessage = false;
                }, 3000);
            }, err => {
                console.log(JSON.stringify(err));
                this.showErrorMessage = true;
                this.messageSubmit = 'Nastąpił nieoczekiwany błąd podczas zapisu.';
            });
    }

    onDelete() {
        if (confirm('Czy na pewno usunąć zdjęcie?')) {
            this.resService.deletePicture(this.pictures[this.imgIndex]._id).subscribe(
                res => {
                    // console.log(res);
                    this.showSuccessMessageDel = true;
                    this.messageSubmit = 'Dziękujemy.';
                    setTimeout(() => {
                        this.showSuccessMessageDel = false;
                        this.loaded = false;
                        this.imagesUrl.length = 0;
                        this.getPictures(this.id);
                        this.imgIndex = '0';
                    }, 3000);
                }, err => {
                    console.log(JSON.stringify(err));
                    this.showErrorMessageDel = true;
                    this.messageSubmitDel = 'Nastąpił nieoczekiwany błąd podczas usuwania.';
                });
        }
    }

    ngOnInit() {
        this.addPictureShow = false;
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });

        if (this.previousRouteService.getPreviousUrl() === '/logged/resources') {
            this.showEditButtons = false;
        } else {
            this.profileData = JSON.parse(localStorage.getItem('profile'));
            this.resService.getResourceById(this.id)
                .subscribe(ResData => {
                    if (!ResData) {
                        return;
                    }
                    this.resourceCheck = ResData;
                    if (this.resourceCheck.wlasciciel[0]._id === this.profileData[0]._id || this.profileData[0].moderator === true) {
                        this.showEditButtons = true;
                    }
                }, err => {
                    console.log(JSON.stringify(err));
                });
        }
        this.getPictures(this.id);
        this.imgIndex = '0';
    }


}

