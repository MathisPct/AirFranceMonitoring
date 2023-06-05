import {Component, Input} from '@angular/core';
import {Passager} from "../../models/passager.model";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-liste-passagers',
  templateUrl: './liste-passagers.component.html',
  styleUrls: ['./liste-passagers.component.scss']
})
export class ListePassagersComponent {
  @Input() passagers!: Passager[];

  public get showToggle(): boolean {
    return this.passagers && this.passagers.length >= 1;
  }

  passagersForm = this._formBuilder.group({
    showAvatarOfPassagers: new FormControl<boolean>(false, Validators.required)
  })

  constructor(private _formBuilder: FormBuilder) {
  }
}
