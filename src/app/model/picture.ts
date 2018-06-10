export class Picture  {
  constructor(opis: string, picture: string, parent?: string
  ) {
    this.opis = opis;
    this.zdjecie = new Array<string>();
    this.zdjecie.push(picture);
    this._parent_def = 'czasoby';
    this._parent_field = 'zdjecia';
    this._parent_id = parent;
  }
  public  _id: string;
  public opis: string;
  public zdjecie: Array<string>;
  public _parent_id: string;
  public _parent_def: string;
  public _parent_field: string;
}
