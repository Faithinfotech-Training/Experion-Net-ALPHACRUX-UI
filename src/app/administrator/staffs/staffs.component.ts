import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-staffs',
  templateUrl: './staffs.component.html',
  styleUrls: ['./staffs.component.scss']
})
export class StaffsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  list() {
    this.router.navigate(['list'], { relativeTo: this.route });
  }
  

  edit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  update(id:number) {
    this.router.navigate(['edit',id], { relativeTo: this.route });
  }

}
