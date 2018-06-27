import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {NewsEntry} from "../shared/news-entry";
import {HttpClient} from "@angular/common/http";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {SettingsService} from "../shared/settings.service";
import {filter} from "rxjs/operators";
import {Observable} from "rxjs";
import {Subject} from "rxjs/Subject";
import {ReadingService} from "../shared/reading.service";
import {Vibration} from "@ionic-native/vibration";

@Component({
  selector: 'page-home',
  templateUrl: 'newsfeed.html'
})
export class NewsfeedPage implements OnInit {
  visibleNews: Array<NewsEntry> = [];
  loadedNews: Subject<Array<NewsEntry>> = new Subject();

  constructor(public navCtrl: NavController,
              private settingsService: SettingsService,
              private readingService: ReadingService,
              private iab: InAppBrowser,
              private vibrator: Vibration,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get<NewsEntry[]>("https://lit-dusk-63084.herokuapp.com/feed").subscribe(res => {
      this.loadedNews.next(res);
    });
    Observable.combineLatest(
      this.settingsService.sourcesSettings$,
      this.settingsService.ressourceSettings$,
      this.loadedNews,
      (sources, ressources, news) => {return {sources: sources, ressources: ressources, news: news};}
    ).pipe(
      filter(combined => combined.sources != null && combined.sources.length > 0),
      filter(combined => combined.ressources != null && combined.ressources.length > 0),
      filter(combined => combined.news != null && combined.news.length > 0)
    ).subscribe((combined) => {
      this.visibleNews = combined.news.filter(value =>
        combined.sources.filter(source => source.source === value.source && source.checked).length > 0
        && combined.ressources.filter(ressource => ressource.ressource === value.resource && ressource.checked).length > 0
      );
    });
  }

  loadInAppBrowser(url: string) {
    this.iab.create(url);
  }

  addToReadingList(event: Event, news: NewsEntry) {
    event.stopPropagation();
    this.vibrator.vibrate(1000);
    this.readingService.addToReadingList(news);
  }

  existsInReadingList(news: NewsEntry): boolean {
    return this.readingService.readingList$.getValue().filter(value => news.url === value.url).length > 0;
  }

}
