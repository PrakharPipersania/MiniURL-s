import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserURLService } from '../user-url.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  redirectURL: string = "";
  description: Array<boolean> = [false,false,false];

  constructor(private activeRoute: ActivatedRoute,private router:Router,private urlService:UserURLService) {
    this.activeRoute.params.subscribe((paramsData) => {
      if(paramsData.id!==undefined) {
        this.urlService.getURLByID(paramsData.id).subscribe((data) => {
          if(!data.length) {
            this.router.navigate(['/page-not-found']);
          }
          let urlDetails = data[0];
          let deviceId: number = this.getDeviceType();
          ++urlDetails.totalClicks;
          ++urlDetails.deviceType[deviceId];
          this.redirectURL = urlDetails.fullURL;
          this.urlService.updateURLById(urlDetails.id,urlDetails).subscribe(() => {
            window.location.href = this.redirectURL;
          })
        })
      }
    })
  }

  ngOnInit(): void { }

  toggleDescription(id:number) {
    this.description.forEach((e,i) => {
      if(i!==id) {
        this.description[i]=false;
      }
    });
    this.description[id]=!this.description[id];
  }

  getDeviceType(): number {
    const ua = navigator.userAgent;
    // Desktop: 0, Mobile: 1, Tablet: 2
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 2;
    }
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return 1;
    }
    return 0;
  }

}