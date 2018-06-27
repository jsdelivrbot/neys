import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Storage} from "@ionic/storage";

@Injectable()
export class SettingsService {
  sourcesSettings$: BehaviorSubject<Array<{source: string, checked: boolean}>> = new BehaviorSubject<Array<{source: string, checked: boolean}>>(null);
  ressourceSettings$: BehaviorSubject<Array<{ressource: string, checked: boolean}>> = new BehaviorSubject<Array<{ressource: string, checked: boolean}>>(null);

  constructor(private storage: Storage) {
    this.initDatabaseIfMissing();
  }

  initDatabaseIfMissing() {
    this.storage.get("sourcesSettings").then(
      (storageSettings) => {
        if (storageSettings == null) {
          this.storage.set("sourcesSettings", [
            {source: "kleinezeitung", checked: true},
            {source: "derstandard", checked: true},
            {source: "ots", checked: true},
            {source: "diepresse", checked: true},
            {source: "wienerzeitung", checked: true}
          ]);
        }
        this.sourcesSettings$.next(storageSettings);
      }
    );

    this.storage.get("ressourcesSettings").then(
      (storageSettings) => {
        if (storageSettings == null) {
          this.storage.set("ressourcesSettings", [
            {ressource: "wirtschaft", checked: true},
            {ressource: "sport", checked: true},
            {ressource: "kultur", checked: true},
            {ressource: "leben", checked: true},
            {ressource: "politik", checked: true},
            {ressource: "bildung", checked: true}
          ]);
        }
        this.ressourceSettings$.next(storageSettings);
      });
  }

  setSourcesSetting(source: string, checked: boolean) {
    let newSettings = this.sourcesSettings$.getValue().map(value =>
      value.source === source ? {source: source, checked: checked} : value
    );
    this.storage.set("sourcesSettings", newSettings);
    this.sourcesSettings$.next(newSettings);
  }

  setRessourcesSetting(ressource: string, checked: boolean) {
    let newSettings = this.ressourceSettings$.getValue().map(value =>
      value.ressource === ressource ? {ressource: ressource, checked: checked} : value
    );
    this.storage.set("ressourcesSettings", newSettings);
    this.ressourceSettings$.next(newSettings);
  }
}
