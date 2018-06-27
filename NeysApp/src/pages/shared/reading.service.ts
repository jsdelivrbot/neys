import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Storage} from "@ionic/storage";
import {NewsEntry} from "./news-entry";

@Injectable()
export class ReadingService {
  readingList$: BehaviorSubject<Array<NewsEntry>> = new BehaviorSubject<Array<NewsEntry>>(null);

  constructor(private storage: Storage) {
    this.initDatabaseIfMissing();
  }

  initDatabaseIfMissing() {
    this.storage.get("readingList").then(
      (storageSettings) => {
        if (storageSettings == null) {
          this.storage.set("readingList", []);
        }
        this.readingList$.next(storageSettings);
      }
    );
  }

  addToReadingList(news: NewsEntry) {
    let currentReadingList = this.readingList$.getValue();
    if (currentReadingList.filter(readingListEntry => readingListEntry.url === news.url).length > 0) {
      return;
    }
    currentReadingList.push(news);
    this.storage.set("readingList", currentReadingList);
    this.readingList$.next(currentReadingList);
  }

  removeFromReadingList(news: NewsEntry) {
    let currentReadingList = this.readingList$.getValue();
    let filteredList = currentReadingList.filter(readingListEntry => readingListEntry.url !== news.url);
    if (filteredList.length === currentReadingList.length) {
      return;
    }
    this.storage.set("readingList", filteredList);
    this.readingList$.next(filteredList);
  }
}
