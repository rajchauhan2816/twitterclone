import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	cnt: number[] = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
  constructor() { }

  ngOnInit(): void {
  }

}
