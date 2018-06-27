import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {ReadingService} from "../shared/reading.service";
import {NewsEntry} from "../shared/news-entry";
import {InAppBrowser} from "@ionic-native/in-app-browser";

@Component({
  selector: 'page-about',
  templateUrl: 'reading-list.html'
})
export class SaveForLaterPage implements OnInit {
  visibleNews: Array<NewsEntry> = [];

  constructor(public navCtrl: NavController,
              private iab: InAppBrowser,
              private readingService: ReadingService) {
  }

  ngOnInit() {
    this.readingService.readingList$.subscribe(list => this.visibleNews = list);
  }

  loadInAppBrowser(url: string) {
    this.iab.create(url);
  }

  removeFromReadingList(event: Event, news: NewsEntry) {
    event.stopPropagation();
    this.readingService.removeFromReadingList(news);
  }

}
