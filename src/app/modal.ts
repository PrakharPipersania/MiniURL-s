export interface URLList {
  createdAt: string,
  fullURL: string,
  key: string,
  usage: Object,
  deviceType: Array<number>,
  totalClicks: number,
  id: number
}

export interface User {
  userName: string,
  userEmail: string,
  userPwd: string,
  userDob: Date,
  id: number
}

export interface GeneratedLinks {
  longURL: string,
  newURL: string,
  buttonText: string
}