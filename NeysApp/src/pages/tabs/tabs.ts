import { Component } from '@angular/core';

import { SaveForLaterPage } from '../reading-list/reading-list';
import { SettingsPage } from '../settings/settings';
import { NewsfeedPage } from '../newsfeed/newsfeed';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NewsfeedPage;
  tab2Root = SaveForLaterPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
