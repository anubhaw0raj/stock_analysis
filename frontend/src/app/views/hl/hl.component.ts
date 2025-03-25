import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { day, stock } from '../../interfaces/stock';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-hl',
  templateUrl: './hl.component.html',
  styleUrls: ['./hl.component.scss']
})
export class HlComponent implements OnInit {

  constructor(private http: HttpClient) { }

  dates: string[] = [];
  start_date: string = '';
  end_date: string = '';

  stcks: stock[] = [];

  not_data_sent: boolean = true;
  data_sent: boolean = false;

  symbol = new FormControl('');
  startdate = new FormControl('');
  enddate = new FormControl('');
  data_arr: any[] = [];

  chartLineData = {
    labels: Array<string>(),
    datasets: [
      {
        label: '',
        backgroundColor: 'rgba(220, 220, 220, 0.2)',
        borderColor: 'rgba(0, 255, 0, 1)',
        pointBackgroundColor: 'rgba(220, 220, 220, 1)',
        pointBorderColor: 'rgba(150, 150, 150, 1)',
        data: Array<number>(),
      },
      {
        label: '',
        backgroundColor: 'rgba(220, 220, 220, 0.2)',
        borderColor: 'rgba(255, 0, 0, 1)',
        pointBackgroundColor: 'rgba(220, 220, 220, 1)',
        pointBorderColor: 'rgba(150, 150, 150, 1)',
        data: Array<number>(),
      }
    ]
  };

  chartLineOptions = {
    maintainAspectRatio: false,
  };
  chartData: boolean = false;

  ngOnInit(): void {
    this.getDates();
  }

  getDates() {
    this.http.get<day[]>(`http://localhost:3000/stocks/dates`).subscribe(data => {
      this.dates = data.map((x: day) => x.date.split(' ')[0]);
      this.dates.sort();
      this.start_date = this.dates[0];
      this.end_date = this.dates[this.dates.length - 1];
    });
  }

  formSubmit() {
    this.data_arr = [this.symbol.value, this.startdate.value, this.enddate.value];
    this.http.get<stock[]>(`http://localhost:3000/stocks/${this.symbol.value}/${this.startdate.value}/${this.enddate.value}`).subscribe(data => {
      this.stcks = data.map(x => { return { ...x, date: x.date.split(' ')[0] }});
      this.symbol.reset();
      this.startdate.reset();
      this.enddate.reset();
      this.chartLineData.labels = this.stcks.map(x => x.date);
      this.chartLineData.datasets[0].data = this.stcks.map(x => x.high);
      this.chartLineData.datasets[0].label = this.data_arr[0]+'-High';
      this.chartLineData.datasets[1].data = this.stcks.map(x => x.low);
      this.chartLineData.datasets[1].label = this.data_arr[0]+'-Low';
      this.chartData = true;
    });
    this.not_data_sent = false;
    this.data_sent = true;
  }

  resetData() {
    this.symbol.reset();
    this.startdate.reset();
    this.enddate.reset();
    this.not_data_sent = true;
    this.data_sent = false;
    this.chartData = false;
    this.stcks = [];
    this.chartLineData.labels = Array<string>();
    this.chartLineData.datasets[0].data = Array<number>();
    this.chartLineData.datasets[0].label = '';
    this.chartLineData.datasets[1].data = Array<number>();
    this.chartLineData.datasets[1].label = '';
  }

}
