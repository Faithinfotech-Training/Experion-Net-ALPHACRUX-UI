import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
  }
  close(){
    this.toastr.success('Redirection to home page')
    this.router.navigateByUrl('pharmacy/meddata');
  }

}
