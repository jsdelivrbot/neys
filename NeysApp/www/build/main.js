webpackJsonp([0],{

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReadingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(79);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ReadingService = /** @class */ (function () {
    function ReadingService(storage) {
        this.storage = storage;
        this.readingList$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.initDatabaseIfMissing();
    }
    ReadingService.prototype.initDatabaseIfMissing = function () {
        var _this = this;
        this.storage.get("readingList").then(function (storageSettings) {
            if (storageSettings == null) {
                _this.storage.set("readingList", []);
            }
            _this.readingList$.next(storageSettings);
        });
    };
    ReadingService.prototype.addToReadingList = function (news) {
        var currentReadingList = this.readingList$.getValue();
        if (currentReadingList.filter(function (readingListEntry) { return readingListEntry.url === news.url; }).length > 0) {
            return;
        }
        currentReadingList.push(news);
        this.storage.set("readingList", currentReadingList);
        this.readingList$.next(currentReadingList);
    };
    ReadingService.prototype.removeFromReadingList = function (news) {
        var currentReadingList = this.readingList$.getValue();
        var filteredList = currentReadingList.filter(function (readingListEntry) { return readingListEntry.url !== news.url; });
        if (filteredList.length === currentReadingList.length) {
            return;
        }
        this.storage.set("readingList", filteredList);
        this.readingList$.next(filteredList);
    };
    ReadingService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], ReadingService);
    return ReadingService;
}());

//# sourceMappingURL=reading.service.js.map

/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(79);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SettingsService = /** @class */ (function () {
    function SettingsService(storage) {
        this.storage = storage;
        this.sourcesSettings$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.ressourceSettings$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.initDatabaseIfMissing();
    }
    SettingsService.prototype.initDatabaseIfMissing = function () {
        var _this = this;
        this.storage.get("sourcesSettings").then(function (storageSettings) {
            if (storageSettings == null) {
                _this.storage.set("sourcesSettings", [
                    { source: "kleinezeitung", checked: true },
                    { source: "derstandard", checked: true },
                    { source: "ots", checked: true },
                    { source: "diepresse", checked: true },
                    { source: "wienerzeitung", checked: true }
                ]);
            }
            _this.sourcesSettings$.next(storageSettings);
        });
        this.storage.get("ressourcesSettings").then(function (storageSettings) {
            if (storageSettings == null) {
                _this.storage.set("ressourcesSettings", [
                    { ressource: "wirtschaft", checked: true },
                    { ressource: "sport", checked: true },
                    { ressource: "kultur", checked: true },
                    { ressource: "leben", checked: true },
                    { ressource: "politik", checked: true },
                    { ressource: "bildung", checked: true }
                ]);
            }
            _this.ressourceSettings$.next(storageSettings);
        });
    };
    SettingsService.prototype.setSourcesSetting = function (source, checked) {
        var newSettings = this.sourcesSettings$.getValue().map(function (value) {
            return value.source === source ? { source: source, checked: checked } : value;
        });
        this.storage.set("sourcesSettings", newSettings);
        this.sourcesSettings$.next(newSettings);
    };
    SettingsService.prototype.setRessourcesSetting = function (ressource, checked) {
        var newSettings = this.ressourceSettings$.getValue().map(function (value) {
            return value.ressource === ressource ? { ressource: ressource, checked: checked } : value;
        });
        this.storage.set("ressourcesSettings", newSettings);
        this.ressourceSettings$.next(newSettings);
    };
    SettingsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], SettingsService);
    return SettingsService;
}());

//# sourceMappingURL=settings.service.js.map

/***/ }),

/***/ 165:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 165;

/***/ }),

/***/ 209:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 209;

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reading_list_reading_list__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_settings__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__newsfeed_newsfeed__ = __webpack_require__(257);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__newsfeed_newsfeed__["a" /* NewsfeedPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__reading_list_reading_list__["a" /* SaveForLaterPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__settings_settings__["a" /* SettingsPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/edi/Library/Mobile Documents/iCloud~com~gogolith~gocoed/Documents/fh_joanneum/ISM/Sem2/CrPlaDev/project/neys/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="News" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Reading List" tabIcon="glasses"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Settings" tabIcon="settings"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/edi/Library/Mobile Documents/iCloud~com~gogolith~gocoed/Documents/fh_joanneum/ISM/Sem2/CrPlaDev/project/neys/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SaveForLaterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_reading_service__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__ = __webpack_require__(139);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SaveForLaterPage = /** @class */ (function () {
    function SaveForLaterPage(navCtrl, iab, readingService) {
        this.navCtrl = navCtrl;
        this.iab = iab;
        this.readingService = readingService;
        this.visibleNews = [];
    }
    SaveForLaterPage.prototype.ngOnInit = function () {
        var _this = this;
        this.readingService.readingList$.subscribe(function (list) { return _this.visibleNews = list; });
    };
    SaveForLaterPage.prototype.loadInAppBrowser = function (url) {
        this.iab.create(url);
    };
    SaveForLaterPage.prototype.removeFromReadingList = function (event, news) {
        event.stopPropagation();
        this.readingService.removeFromReadingList(news);
    };
    SaveForLaterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"/Users/edi/Library/Mobile Documents/iCloud~com~gogolith~gocoed/Documents/fh_joanneum/ISM/Sem2/CrPlaDev/project/neys/src/pages/reading-list/reading-list.html"*/'<ion-header>\n  <ion-navbar>\n   <header>\n     <ion-title>Reading List</ion-title>\n   </header>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ul class="news-list">\n    <li class="news-entry" *ngFor="let news of visibleNews">\n      <div role="link" (click)="loadInAppBrowser(news.url)">\n        <div class="resource-and-source"> {{news.resource.toUpperCase() + \' | \' + (news.source | sourcePipe)}}\n          <button class="action-button" (click)="removeFromReadingList($event, news)" aria-label="Remove from reading list"><ion-icon name="trash"></ion-icon></button>\n        </div>\n        <div class="news-title"> {{news.title}}</div>\n        <div class="date-and-author"> {{news.date | date: \'dd.MM.yyyy HH:mm\'}} <span *ngIf="news.author != null"> {{\', \' + news.author}}</span> </div>\n        <div class="description"> {{news.description}}</div>\n      </div>\n    </li>\n  </ul>\n</ion-content>\n\n'/*ion-inline-end:"/Users/edi/Library/Mobile Documents/iCloud~com~gogolith~gocoed/Documents/fh_joanneum/ISM/Sem2/CrPlaDev/project/neys/src/pages/reading-list/reading-list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_2__shared_reading_service__["a" /* ReadingService */]])
    ], SaveForLaterPage);
    return SaveForLaterPage;
}());

//# sourceMappingURL=reading-list.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_settings_service__ = __webpack_require__(140);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SettingsPage = /** @class */ (function () {
    function SettingsPage(navCtrl, settingsService, storage) {
        this.navCtrl = navCtrl;
        this.settingsService = settingsService;
        this.storage = storage;
        this.settingsTab = 'sources';
    }
    SettingsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.settingsService.ressourceSettings$.subscribe(function (value) { return _this.ressourceSettings = value; });
        this.settingsService.sourcesSettings$.subscribe(function (value) { return _this.sourcesSettings = value; });
    };
    SettingsPage.prototype.toggleRessourceSelect = function (ressource, event) {
        this.settingsService.setRessourcesSetting(ressource, event._value);
    };
    SettingsPage.prototype.toggleSourceSelect = function (source, event) {
        this.settingsService.setSourcesSetting(source, event._value);
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"/Users/edi/Library/Mobile Documents/iCloud~com~gogolith~gocoed/Documents/fh_joanneum/ISM/Sem2/CrPlaDev/project/neys/src/pages/settings/settings.html"*/'<ion-header>\n  <header>\n    <ion-title>Settings</ion-title>\n    <ion-segment color="primary" [(ngModel)]="settingsTab">\n      <ion-segment-button value="sources">\n        Sources\n      </ion-segment-button>\n      <ion-segment-button value="ressources">\n        Resources\n      </ion-segment-button>\n    </ion-segment>\n  </header>\n</ion-header>\n\n<ion-content>\n  <div *ngIf="settingsTab === \'sources\'">\n    <ion-item *ngFor="let setting of sourcesSettings">\n      <ion-label>{{setting.source | sourcePipe}}</ion-label>\n      <ion-checkbox color="dark" [checked]="setting.checked" (ionChange)="toggleSourceSelect(setting.source, $event)"></ion-checkbox>\n    </ion-item>\n  </div>\n\n  <div *ngIf="settingsTab === \'ressources\'">\n    <ion-item *ngFor="let setting of ressourceSettings">\n      <ion-label style="text-transform:capitalize;">{{setting.ressource}}</ion-label>\n      <ion-checkbox color="dark" [checked]="setting.checked" (ionChange)="toggleRessourceSelect(setting.ressource, $event)"></ion-checkbox>\n    </ion-item>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/edi/Library/Mobile Documents/iCloud~com~gogolith~gocoed/Documents/fh_joanneum/ISM/Sem2/CrPlaDev/project/neys/src/pages/settings/settings.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__shared_settings_service__["a" /* SettingsService */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewsfeedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_settings_service__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_operators___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Subject__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_reading_service__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_vibration__ = __webpack_require__(351);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var NewsfeedPage = /** @class */ (function () {
    function NewsfeedPage(navCtrl, settingsService, readingService, iab, vibrator, http) {
        this.navCtrl = navCtrl;
        this.settingsService = settingsService;
        this.readingService = readingService;
        this.iab = iab;
        this.vibrator = vibrator;
        this.http = http;
        this.visibleNews = [];
        this.loadedNews = new __WEBPACK_IMPORTED_MODULE_7_rxjs_Subject__["Subject"]();
        this.loading = true;
    }
    NewsfeedPage.prototype.ngOnInit = function () {
        var _this = this;
        this.fetchNews();
        __WEBPACK_IMPORTED_MODULE_6_rxjs__["Observable"].combineLatest(this.settingsService.sourcesSettings$, this.settingsService.ressourceSettings$, this.loadedNews, function (sources, ressources, news) { return { sources: sources, ressources: ressources, news: news }; }).pipe(Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["filter"])(function (combined) { return combined.sources != null && combined.sources.length > 0; }), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["filter"])(function (combined) { return combined.ressources != null && combined.ressources.length > 0; }), Object(__WEBPACK_IMPORTED_MODULE_5_rxjs_operators__["filter"])(function (combined) { return combined.news != null && combined.news.length > 0; })).subscribe(function (combined) {
            _this.visibleNews = combined.news.filter(function (value) {
                return combined.sources.filter(function (source) { return source.source === value.source && source.checked; }).length > 0
                    && combined.ressources.filter(function (ressource) { return ressource.ressource === value.resource && ressource.checked; }).length > 0;
            });
        });
    };
    NewsfeedPage.prototype.fetchNews = function () {
        var _this = this;
        this.http.get("https://lit-dusk-63084.herokuapp.com/feed").subscribe(function (res) {
            _this.loadedNews.next(res);
            _this.loading = false;
        });
    };
    NewsfeedPage.prototype.refreshNews = function () {
        this.loading = true;
        this.fetchNews();
    };
    NewsfeedPage.prototype.loadInAppBrowser = function (url) {
        this.iab.create(url);
    };
    NewsfeedPage.prototype.addToReadingList = function (event, news) {
        event.stopPropagation();
        this.vibrator.vibrate(1000);
        this.readingService.addToReadingList(news);
    };
    NewsfeedPage.prototype.existsInReadingList = function (news) {
        return this.readingService.readingList$.getValue().filter(function (value) { return news.url === value.url; }).length > 0;
    };
    NewsfeedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/edi/Library/Mobile Documents/iCloud~com~gogolith~gocoed/Documents/fh_joanneum/ISM/Sem2/CrPlaDev/project/neys/src/pages/newsfeed/newsfeed.html"*/'<ion-header>\n  <ion-navbar>\n    <header>\n      <ion-title>Neys</ion-title>\n      <button class="refresh-button" tabindex="0" aria-label="Refresh news" (click)="refreshNews()"><ion-icon name="refresh"></ion-icon></button>\n    </header>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-spinner *ngIf="loading" aria-label="loading news, please wait"></ion-spinner>\n  <ul *ngIf="!loading" class="news-list">\n    <li class="news-entry" *ngFor="let news of visibleNews">\n      <div role="link" tabindex="0" (click)="loadInAppBrowser(news.url)">\n        <div class="resource-and-source"> {{news.resource.toUpperCase() + \' | \' + (news.source | sourcePipe)}}\n          <button *ngIf="!existsInReadingList(news)" class="action-button" (click)="addToReadingList($event, news)" aria-label="Add to reading list"><ion-icon name="add"></ion-icon></button>\n        </div>\n        <div class="news-title"> {{news.title}}</div>\n        <div class="date-and-author"> {{news.date | date: \'dd.MM.yyyy HH:mm\'}} <span *ngIf="news.author != null"> {{\', \' + news.author}}</span> </div>\n        <div class="description"> {{news.description}}</div>\n      </div>\n    </li>\n  </ul>\n</ion-content>\n'/*ion-inline-end:"/Users/edi/Library/Mobile Documents/iCloud~com~gogolith~gocoed/Documents/fh_joanneum/ISM/Sem2/CrPlaDev/project/neys/src/pages/newsfeed/newsfeed.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__shared_settings_service__["a" /* SettingsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_settings_service__["a" /* SettingsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_8__shared_reading_service__["a" /* ReadingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__shared_reading_service__["a" /* ReadingService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_9__ionic_native_vibration__["a" /* Vibration */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__ionic_native_vibration__["a" /* Vibration */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]) === "function" && _f || Object])
    ], NewsfeedPage);
    return NewsfeedPage;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=newsfeed.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(357);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_reading_list_reading_list__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_settings_settings__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_newsfeed_newsfeed__ = __webpack_require__(257);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_common_http__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_in_app_browser__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_storage__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_shared_settings_service__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_shared_source_pipe__ = __webpack_require__(683);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_shared_reading_service__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_vibration__ = __webpack_require__(351);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_reading_list_reading_list__["a" /* SaveForLaterPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_newsfeed_newsfeed__["a" /* NewsfeedPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_shared_source_pipe__["a" /* SourcePipe */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_10__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_reading_list_reading_list__["a" /* SaveForLaterPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_newsfeed_newsfeed__["a" /* NewsfeedPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_vibration__["a" /* Vibration */],
                __WEBPACK_IMPORTED_MODULE_13__pages_shared_settings_service__["a" /* SettingsService */],
                __WEBPACK_IMPORTED_MODULE_15__pages_shared_reading_service__["a" /* ReadingService */],
                __WEBPACK_IMPORTED_MODULE_14__pages_shared_source_pipe__["a" /* SourcePipe */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(254);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/edi/Library/Mobile Documents/iCloud~com~gogolith~gocoed/Documents/fh_joanneum/ISM/Sem2/CrPlaDev/project/neys/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/edi/Library/Mobile Documents/iCloud~com~gogolith~gocoed/Documents/fh_joanneum/ISM/Sem2/CrPlaDev/project/neys/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 683:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SourcePipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SourcePipe = /** @class */ (function () {
    function SourcePipe() {
    }
    SourcePipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        switch (value) {
            case 'kleinezeitung': return 'KleineZeitung.at';
            case 'derstandard': return 'derStandard.at';
            case 'ots': return 'ots.at';
            case 'diepresse': return 'DiePresse.at';
            case 'wienerzeitung': return 'WienerZeitung.at';
            default: return 'UnknownSource';
        }
    };
    SourcePipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            pure: true,
            name: 'sourcePipe'
        })
    ], SourcePipe);
    return SourcePipe;
}());

//# sourceMappingURL=source.pipe.js.map

/***/ })

},[352]);
//# sourceMappingURL=main.js.map