import { Component, OnInit } from '@angular/core';
import { URLList } from '../modal';
import { UserURLService } from '../user-url.service';

@Component({
  selector: 'app-url-list',
  templateUrl: './url-list.component.html',
  styleUrls: ['./url-list.component.css']
})
export class UrlListComponent implements OnInit {

  urlList:Array<URLList> = [];
  currURL: string = "https://miniurls.netlify.app/";

  constructor(private urlService:UserURLService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.urlService.getAllURLList().subscribe((data) => {
      this.urlList = data;
     })
  }

}