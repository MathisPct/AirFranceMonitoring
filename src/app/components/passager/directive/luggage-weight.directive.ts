import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ClasseVol, Passager} from "../../../models/passager.model";

@Directive({
  selector: '[appLuggageWeight]'
})
export class LuggageWeightDirective implements  OnChanges{
  @Input()
  appLuggageWeight!: Passager
  constructor(private el: ElementRef) { }

  weightClass: number[] = [1,2,3]
  ngOnChanges(changes: SimpleChanges): void {
    if(changes){
      if(this.appLuggageWeight.nbBagagesSoute > this.weightClass[this.appLuggageWeight.classeVol]) {
        this.el.nativeElement.style.backgroundColor = 'red';
      }
    }
  }


}
