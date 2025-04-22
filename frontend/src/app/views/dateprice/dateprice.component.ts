import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { day, stock } from '../../interfaces/stock';
import { FormControl } from '@angular/forms';
import { BACKEND_URL } from '../../interfaces/stock';

@Component({
  selector: 'app-dateprice',
  templateUrl: './dateprice.component.html',
  styleUrls: ['./dateprice.component.scss']
})
export class DatepriceComponent implements OnInit {

  constructor(private http: HttpClient) { }

  dates: string[] = [];
  stcks: stock[] = [];
  date = new FormControl('');
  date_data: any;
  default_stocks: string[] = [];

  not_data_sent: boolean = true;
  data_sent: boolean = false;
   chartLineData = {
    labels: [],
    datasets: [
      {
        label: '',
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          
          // Create gradient
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, 'rgba(25, 118, 210, 0.1)');
          gradient.addColorStop(1, 'rgba(25, 118, 210, 0.4)');
          return gradient;
        },
        borderColor: 'rgba(25, 118, 210, 1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(25, 118, 210, 1)',
        pointBorderColor: '#fff',
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(25, 118, 210, 1)',
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
      duration: 1200,
      easing: 'easeOutCubic',
    }
  };
  chartData: boolean = false;

  ngOnInit(): void {
    this.getPopularStocks();
    this.getDates();
  }

  getPopularStocks() {
    this.http.get<any[]>(`${BACKEND_URL}/stocks/popular`).subscribe(data => {
      let listData: string[] = data.map(x => x.symbol);
      this.default_stocks = listData;
      this.chartLineData.labels = [...listData] as never[];
    });
  }

  getDates() {
    this.http.get<day[]>(`${BACKEND_URL}/stocks/dates`).subscribe(data => {
      this.dates = data.map((x: day) => x.date.split(' ')[0]);
      this.dates.sort();
    });
  }

  formSubmit() {
    this.date_data = this.date.value;
    this.http.get<stock[]>(`${BACKEND_URL}/stocks/${this.default_stocks}/${this.date.value}`).subscribe(data => {
      console.log(data);
      this.stcks = data.map(x => { return { ...x, date: x.date.split(' ')[0] }});
      this.date.reset();
      this.chartLineData.datasets[0].data = this.stcks.map(x => x.close);
      this.chartLineData.datasets[0].label = this.date_data;
      this.chartData = true;
    });
    this.not_data_sent = false;
    this.data_sent = true;
  }

  resetData() {
    this.date.reset();
    this.not_data_sent = true;
    this.data_sent = false;
    this.chartData = false;
    this.stcks = [];
    this.chartLineData.datasets[0].data = Array<number>();
    this.chartLineData.datasets[0].label = '';
  }
}
