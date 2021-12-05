import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public userData: any;
  public errorMessage: string;
  constructor(private _appService: AppService) {}

  ngOnInit(): void {
    this._appService.getProfile().subscribe((data) => {
      this.userData = data;
      console.log(data);
    }, (error) => { this.errorMessage = error} );
  }
}
