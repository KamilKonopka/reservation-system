import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpParams, HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {IMedia} from '../interfaces/iMedia';
import {Picture} from '../model/picture';

const basicUrl = 'https://ecommunity-80ee.restdb.io/';
const mediaTableName = 'media';
const picturesTableName = 'czdjecia';
const options = {
  headers:
    {   'cache-control': 'no-cache',
      'x-apikey': '5ad4ec0a25a622ae4d52836f',
      'content-type': 'application/json'
    }
};

const optionsForMedia = {
  headers:
    {   'cache-control': 'no-cache',
        'x-apikey': '5ad4ec0a25a622ae4d52836f'
    }
};


@Injectable()
export class FileUploaderService {
  retValue: Observable<object> ;
  result: IMedia;

public returnData: BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor(private http: HttpClient) {

   }

  public addPicture(fileToUpload: File, description: string, parent_id: string):  Observable<object> {

    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post(basicUrl + mediaTableName, formData, optionsForMedia).subscribe( result => {
      this.result = JSON.parse(JSON.stringify(result));
      const obrazek = new Picture(description, this.result.ids[0], parent_id);
            this.http.post(basicUrl + 'rest/' + picturesTableName, obrazek , options ).subscribe( res => {
            this.returnData.next(res);
          },
          err => {
            this.returnData.error(err);
          }
          );
      }
    , err => {
        this.returnData.error(err);
      }

    )
    return  this.returnData.asObservable();
  }
}
