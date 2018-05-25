import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {ResourcesService} from '../services/resources.service';

const mediaUrl = 'https://ecommunity-80ee.restdb.io/media/';

@Component({
    selector: 'app-resources-pictures',
    templateUrl: './resources-pictures.component.html',
    styleUrls: ['./resources-pictures.component.less']
})
export class ResourcesPicturesComponent implements OnInit {


    private id: string;
    public pictures: object;
    public imagesUrl = new Array();
    public imageInd: string;

    constructor(private location: Location, private route: ActivatedRoute, private resService: ResourcesService) {
    }

    getPictures(id) {
        this.resService.getPictures(id).subscribe(pics => {
            this.pictures = pics;
            for (let i = 0; i < 3; i++) {
                this.imagesUrl.push(mediaUrl + this.pictures[i].zdjecie);
            }
        });

    }

    goBack() {
        this.location.back();
    }

    handleEvent(event) {
        console.log(`${event.valueOf()}`);
        this.imageInd = `${event.valueOf()}`;
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.getPictures(this.id);
        this.imageInd = '0';
    }

}
