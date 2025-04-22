import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { day, stock } from '../../interfaces/stock';
import { FormControl } from '@angular/forms';
import { BACKEND_URL  } from '../../interfaces/stock';

@Component({
  selector: 'app-closeprice',
  templateUrl: './closeprice.component.html',
  styleUrls: ['./closeprice.component.scss']
})
export class ClosepriceComponent implements OnInit {

  constructor(private http: HttpClient) { }

  dates: string[] = [];
  stcks: stock[] = [];

  start_date: string = '';
  end_date: string = '';

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
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          
          // Create gradient
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, 'rgba(54, 162, 235, 0.1)');
          gradient.addColorStop(1, 'rgba(54, 162, 235, 0.4)');
          return gradient;
        },
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointBorderColor: '#fff',
        pointRadius: 4,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
        pointHoverBorderWidth: 3,
        tension: 0.4,
        data: Array<number>(),
        fill: true
      }
    ]
  };

  chartLineOptions = {
    maintainAspectRatio: false,
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        titleFont: {
          size: 14,
          weight: 'bold',
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
        },
        bodyFont: {
          size: 13,
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
        },
        padding: 12,
        cornerRadius: 6,
        displayColors: false,
        usePointStyle: true
      },
      legend: {
        labels: {
          font: {
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            size: 14,
            weight: 'bold'
          },
          color: 'rgb(70, 70, 70)',
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgb(100, 100, 100)',
          font: {
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(200, 200, 200, 0.2)',
        },
        ticks: {
          color: 'rgb(100, 100, 100)',
          font: {
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          }
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
    }
  };
  chartData: boolean = false;

  ngOnInit(): void {
    this.getDates();
  }

  getDates() {
    this.http.get<day[]>(`${BACKEND_URL}/stocks/dates`).subscribe(data => {
      this.dates = data.map((x: day) => x.date.split(' ')[0]);
      this.dates.sort();
      this.start_date = this.dates[0];
      this.end_date = this.dates[this.dates.length - 1];
    });
  }

  formSubmit() {
    this.data_arr = [this.symbol.value, this.startdate.value, this.enddate.value];
    this.http.get<stock[]>(`${BACKEND_URL}/stocks/${this.symbol.value}/${this.startdate.value}/${this.enddate.value}`).subscribe(data => {
      this.stcks = data.map(x => { return { ...x, date: x.date.split(' ')[0] }});
      this.symbol.reset();
      this.startdate.reset();
      this.enddate.reset();
      this.chartLineData.labels = this.stcks.map(x => x.date);
      this.chartLineData.datasets[0].data = this.stcks.map(x => x.close);
      this.chartLineData.datasets[0].label = this.data_arr[0];
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
  }

}
