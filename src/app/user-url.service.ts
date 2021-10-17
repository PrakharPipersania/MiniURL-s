import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLList, User } from './modal';

@Injectable({
  providedIn: 'root'
})
export class UserURLService {

  constructor(private http:HttpClient) { }

  // Users
  saveUser(userDetails:User) {
    return this.http.post(`https://615ef420af365900172046b6.mockapi.io/prakharp/users`,userDetails);
  }

  getUserByEmail(userEmail:string) {
    return this.http.get<Array<User>>(`https://615ef420af365900172046b6.mockapi.io/prakharp/users/?userEmail=${userEmail}`)
  }

  updateUserById(userId:number,userDetails:User) {
    return this.http.put(`https://615ef420af365900172046b6.mockapi.io/prakharp/users/${userId}`,userDetails)
  }

  deleteUserById(userId:number) {
    return this.http.delete(`https://615ef420af365900172046b6.mockapi.io/prakharp/users/${userId}`)
  }

  //URL's
  saveURL(urlDetails: URLList) {
    return this.http.post(`https://615ef420af365900172046b6.mockapi.io/prakharp/links`,urlDetails);
  }

  getURLByID(urlId:string) {
    return this.http.get<Array<URLList>>(`https://615ef420af365900172046b6.mockapi.io/prakharp/links/?key=${urlId}`)
  }

  getAllURLList() {
    return this.http.get<Array<URLList>>(`https://615ef420af365900172046b6.mockapi.io/prakharp/links`)
  }

  updateURLById(urlId:number,urlData:URLList) {
    return this.http.put(`https://615ef420af365900172046b6.mockapi.io/prakharp/links/${urlId}`,urlData)
  }

  deleteURLById(urlId:number) {
    return this.http.delete(`https://615ef420af365900172046b6.mockapi.io/prakharp/links/${urlId}`)
  }

  //QR Code
  getQRCode(url: string) {
    return this.http.get(`https://api.qrserver.com/v1/create-qr-code/?size=450x450&data=${url}`, { responseType: 'blob' });
  }

}