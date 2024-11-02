import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ChuckNorrisService } from '../../services/chuck-norris.service';

@Component({
  selector: 'app-broma',
  templateUrl: './broma.component.html',
  styleUrls: ['./broma.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BromaComponent implements OnInit {
  bromita: string = '';
  url: string = '';

  constructor(private chuckNorrisService: ChuckNorrisService) {}

  ngOnInit(): void {
    this.loadBromita();
  }

  async loadBromita() {
    //this.bromita = await this.chuckNorrisService.getChistes();
    this.chuckNorrisService.getChistes().subscribe((res) => {
      console.log(res);
      this.bromita = res.value;
      this.url = res.icon_url;
    });
  }

  shareOnFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}&quote=${encodeURIComponent(this.bromita)}`;
    window.open(url, '_blank');
  }

  shareOnTwitter() {}
}
