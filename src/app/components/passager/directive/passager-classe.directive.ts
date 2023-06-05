import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ClasseVol} from "../../../models/passager.model";

@Directive({
  selector: '[appPassagerClasse]'
})
export class PassagerClasseDirective implements OnChanges {
  @Input() appPassagerClasse!: ClasseVol;
  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes) {
      switch (this.appPassagerClasse) {
        case ClasseVol.STANDARD:
          this.el.nativeElement.style.color = 'blue';
          break;
        case ClasseVol.PREMIUM:
          this.el.nativeElement.style.color = 'green';
          break;
        case ClasseVol.BUSINESS:
          this.el.nativeElement.style.color = 'red';
          break;
        default:
          this.el.nativeElement.style.color = 'gray';
          break;
      }
    }
  }

}
