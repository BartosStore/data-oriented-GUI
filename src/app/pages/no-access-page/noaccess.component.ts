import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-noaccess',
  templateUrl: './noaccess.component.html',
  styleUrls: ['./noaccess.component.scss']
})
export class NoaccessComponent implements OnInit {

  public url: string = null;

  constructor(
    private route: ActivatedRoute
  ) { }

  public ngOnInit() {
    this.url = this.route.snapshot.paramMap.get('url');
  }
}
