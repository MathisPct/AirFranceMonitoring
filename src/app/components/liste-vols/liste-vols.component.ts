import {Component, Input} from '@angular/core';
import {Vol} from "../../models/vol.model";

@Component({
  selector: 'app-liste-vols',
  templateUrl: './liste-vols.component.html',
  styleUrls: ['./liste-vols.component.scss']
})
export class ListeVolsComponent {
  @Input()
  vols! : Vol[];
}
