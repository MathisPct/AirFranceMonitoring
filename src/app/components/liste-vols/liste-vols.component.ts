import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Vol} from "../../models/vol.model";
import {IFiltres} from "../../models/filtres.model";

@Component({
  selector: 'app-liste-vols',
  templateUrl: './liste-vols.component.html',
  styleUrls: ['./liste-vols.component.scss']
})
export class ListeVolsComponent {
  @Input()
  type!: 'decollages' | 'atterissages';

  @Input()
  vols! : Vol[];
  @Output()
  clickVol = new EventEmitter<Vol>();
  onVolClick(vol: Vol) {
    this.clickVol.emit(vol);
  }
}
