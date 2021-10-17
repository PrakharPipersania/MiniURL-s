import { Component, OnInit } from '@angular/core';
import { URLList } from '../modal';
import { ActivatedRoute, Router } from '@angular/router';
import { UserURLService } from '../user-url.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-url-desp',
  templateUrl: './url-desp.component.html',
  styleUrls: ['./url-desp.component.css']
})
export class UrlDespComponent implements OnInit {

  urlId?:string = undefined;
  currURL: string = "https://miniurls.netlify.app/";
  buttonText: string = "Copy URL";
  highChart: Chart =  new Chart();
  qrCodeImage: any;

  urlDetails:URLList = {
    createdAt: new Date().toString().slice(4,15).toUpperCase(),
    fullURL: "",
    key: "",
    usage: {},
    deviceType: [0,0,0],
    totalClicks: 0,
    id: 0
  };

  constructor(private activeRoute: ActivatedRoute,private router:Router,private urlService:UserURLService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.activeRoute.params.subscribe((paramsData) => {
      this.urlId = paramsData.id;
      if(paramsData.id!==undefined) {
        this.urlService.getURLByID(paramsData.id).subscribe((data) => {
          if(!data.length) {
            this.router.navigate(['/page-not-found']);
          }
          this.urlDetails = data[0];
          this.getQRCodeFromService();
          this.highChart = new Chart({
            chart: {
              backgroundColor: '#2A2E35',
              borderRadius: 10,
              style: {
                  fontFamily: 'Trebuchet MS',
                  color: '#D4D5D7'
              }
            },
            title: {
              text: 'Device Type',
              style: {
                color: '#D4D5D7',
                font: 'bold 18px "Trebuchet MS", Verdana, sans-serif'
              }
            },
            credits: {
              enabled: false
            },
            plotOptions: {
              pie: {
                  colors: ['#22DC8B', '#3587FF', '#5E676F'],
                  cursor: 'pointer',
                  innerSize: 120,
                  depth: 45
              }
            },
            series: [{
              type: 'pie',
              name: 'Links Clicked',
              data: [
                ['Desktop', data[0].deviceType[0]],
                ['Mobile', data[0].deviceType[1]],
                ['Tablet', data[0].deviceType[2]],
              ]
            }],
            responsive: {
              rules: [{
                  condition: {
                      maxWidth: 500
                  }
              }]
            }
          });
        })
      }
    })
  }

  copyURL(key:string) {
    navigator.clipboard.writeText(this.currURL+key);
    this.buttonText = "Copied!";
    setTimeout(() => {
      this.buttonText = "Copy URL";
    }, 700);
  }

  deleteURL(id:number) {
    this.urlService.deleteURLById(id).subscribe((data) => {
      this.router.navigate(['/dashboard']);
    })
  }

  createQRCodeImage(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.qrCodeImage = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getQRCodeFromService() {
      this.urlService.getQRCode(this.currURL+this.urlDetails.key).subscribe(data => {
        this.createQRCodeImage(data);
      }, error => {
        console.log("Failed to Load QR Code: ",error);
      });
  }

}