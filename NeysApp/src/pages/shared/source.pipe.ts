import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  pure: true,
  name: 'sourcePipe'
})
export class SourcePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    switch (value) {
      case 'kleinezeitung': return 'KleineZeitung.at';
      case 'derstandard': return 'derStandard.at';
      case 'ots': return 'ots.at';
      case 'diepresse': return 'DiePresse.at';
      case 'wienerzeitung': return 'WienerZeitung.at';
      default: return 'UnknownSource';
    }
  }

}
