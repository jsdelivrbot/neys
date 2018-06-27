import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {SaveForLaterPage} from '../pages/reading-list/reading-list';
import {SettingsPage} from '../pages/settings/settings';
import {NewsfeedPage} from '../pages/newsfeed/newsfeed';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HttpClientModule} from "@angular/common/http";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {IonicStorageModule} from "@ionic/storage";
import {SettingsService} from "../pages/shared/settings.service";
import {SourcePipe} from "../pages/shared/source.pipe";
import {ReadingService} from "../pages/shared/reading.service";
import {Vibration} from "@ionic-native/vibration";

@NgModule({
  declarations: [
    MyApp,
    SaveForLaterPage,
    SettingsPage,
    NewsfeedPage,
    SourcePipe,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SaveForLaterPage,
    SettingsPage,
    NewsfeedPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    Vibration,
    SettingsService,
    ReadingService,
    SourcePipe,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
