import {Component, Input} from '@angular/core';
import {ClasseVol, Passager} from "../../models/passager.model";

@Component({
  selector: 'app-passager',
  templateUrl: './passager.component.html',
  styleUrls: ['./passager.component.scss']
})
export class PassagerComponent {
  @Input() passager!: Passager;
  @Input() canShowAvatar!: boolean | null;
  protected readonly ClasseVol = ClasseVol;
}
