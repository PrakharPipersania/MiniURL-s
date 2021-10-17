import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneratedLinks, URLList } from '../modal';
import { UserURLService } from '../user-url.service';

@Component({
  selector: 'app-shorten',
  templateUrl: './shorten.component.html',
  styleUrls: ['./shorten.component.css']
})
export class ShortenComponent implements OnInit {

  urlForm:FormGroup;
  currURL: string = "https://miniurls.netlify.app/";
  generatedLinks: Array<GeneratedLinks> = [];

  constructor(private urlService:UserURLService) { 
    this.urlForm = new FormGroup({
      'urlLink': new FormControl('', [Validators.required, Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")])
    });
  }

  ngOnInit(): void { }

  randomKey(): string {
    let chars:string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let key:string = "";
    for (let i=0;i<4;++i) {
      key+= chars[Math.floor(Math.random()*62)];
    }
    return key;
  }
  
  shortenURL() {
    Object.keys(this.urlForm.controls).forEach(field => {
      const control = this.urlForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });

    if(this.urlForm.valid&&this.urlForm.dirty){
      let longURL:string = this.makeValidUrl(this.urlForm.value.urlLink);
      let key:string = this.randomKey();

      console.log(longURL);

      this.generatedLinks.unshift({
        longURL: longURL,
        newURL: this.currURL + key,
        buttonText: "Copy URL"
      });
      if(this.generatedLinks.length>3) {
        this.generatedLinks.length = 3;
      }
      this.urlService.saveURL(this.createDetails(longURL,key)).subscribe((data) => {
          this.urlForm.reset();
      },() => {
        alert("Something Went Wrong!")
      })
    }
  }

  makeValidUrl(url: string) {
    let newUrl = window.decodeURIComponent(url);
    newUrl = newUrl.trim().replace(/\s/g, "");
    if (/^(:\/\/)/.test(newUrl)) {
        return `http${newUrl}`;
    }
    if (!/^(f|ht)tps?:\/\//i.test(newUrl)) {
        return `http://${newUrl}`;
    }
    return newUrl;
  }

  copyURL(id:number) {
    navigator.clipboard.writeText(this.generatedLinks[id].newURL);
    this.generatedLinks[id].buttonText = "Copied!";
    setTimeout(() => {
      this.generatedLinks[id].buttonText = "Copy URL";
    }, 700);
  }

  createDetails(longURL: string, shortURL: string): URLList {
    return ({
      createdAt: new Date().toString().slice(4,15).toUpperCase(),
      fullURL: longURL,
      key: shortURL,
      usage: {},
      deviceType: [0,0,0],
      totalClicks: 0,
      id: 0
    });
  }

}