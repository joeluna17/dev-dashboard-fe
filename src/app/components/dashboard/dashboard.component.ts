import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private _appSerive: AppService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this._appSerive.getAllAppUsers().subscribe((users) => console.log(users));
  }
}
