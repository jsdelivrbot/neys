import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {SettingsService} from "../shared/settings.service";

@Component({
  selector: 'page-contact',
  templateUrl: 'settings.html'
})
export class SettingsPage implements OnInit {
  settingsTab: string = 'sources';
  sourcesSettings: Array<{source: string, checked: boolean}>;
  ressourceSettings: Array<{ressource: string, checked: boolean}>;

  constructor(public navCtrl: NavController,
              private settingsService: SettingsService,
              private storage: Storage) {
  }

  ngOnInit() {
    this.settingsService.ressourceSettings$.subscribe(value => this.ressourceSettings = value);
    this.settingsService.sourcesSettings$.subscribe(value => this.sourcesSettings = value);
  }

  toggleRessourceSelect(ressource: string, event: any) {
    this.settingsService.setRessourcesSetting(ressource, event._value);
  }

  toggleSourceSelect(source: string, event: any) {
    this.settingsService.setSourcesSetting(source, event._value);
  }
}
