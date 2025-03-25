import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { day } from '../../interfaces/stock';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dates: string[] = [];
  start_date: string = '';
  end_date: string = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getDates();
  }

  getDates() {
    this.http.get<day[]>(`http://localhost:3000/stocks/dates`).subscribe(data => {
      this.dates = data.map((x: day) => x.date.split(' ')[0]);
      this.dates.sort();
      this.start_date = this.dates[0];
      this.end_date = this.dates[this.dates.length - 1];
      // console.log(this.dates);
    });
  }
}
