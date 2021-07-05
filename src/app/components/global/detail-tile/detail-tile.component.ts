import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-tile',
  templateUrl: './detail-tile.component.html',
  styleUrls: ['./detail-tile.component.css'],
})
export class DetailTileComponent implements OnInit {
  @Input() title: string;
  @Input() value: any;
  @Input() colour: string = '343423';
  public tileWrapperStyle: {};
  public tileColourStyle: {};

  constructor() {}

  ngOnInit(): void {
    this.tileWrapperStyle = {
      border: `3px solid #${this.colour}`,
    };

    this.tileColourStyle = {
      backgroundColor: `#${this.colour}`,
    };
  }
}
