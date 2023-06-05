import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MAT_DATE_RANGE_SELECTION_STRATEGY} from '@angular/material/datepicker';
import {FiveDayRangeSelectionStrategy} from 'src/app/date-adapter';
import {IAeroport} from 'src/app/models/aeroport.model';
import {AEROPORTS} from './../../constants/aeroport.constant';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IFiltres} from "../../models/filtres.model";

export interface FiltreFormModel extends FormGroup<{
    aeroport: FormControl<IAeroport | null>;
    debut: FormControl<number | null>;
    fin: FormControl<number | null>;
}> {

}

@Component({
    selector: 'app-filtres',
    templateUrl: './filtres.component.html',
    styleUrls: ['./filtres.component.scss'],
    providers: [
        {
            provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
            useClass: FiveDayRangeSelectionStrategy,
        },
    ],
    encapsulation: ViewEncapsulation.None
})
export class FiltresComponent implements OnInit {
    /**
     * La liste des aéroports disponibles est une constante,
     * on n'utilise que les principaux aéroports français pour l'instant
     */
    aeroports: IAeroport[] = AEROPORTS;

    form: FiltreFormModel = this._formBuilder.group({
        aeroport: new FormControl<IAeroport | null>(null, Validators.required),
        debut: new FormControl<number | null>(null, Validators.required),
        fin: new FormControl<number | null>(null, Validators.required)
    });

    @Output() changeInput = new EventEmitter<IFiltres>();

    constructor(private _formBuilder: FormBuilder) {
    }
    onSubmit() {
        if(this.form.valid) {
            const endDateValue: number = this.form.controls.fin.value ?? 0;
            const beginDataValue: number = this.form.controls.debut.value ?? 0;
            const selectedAeroport: IAeroport | null = this.form.controls.aeroport.value ?? null;
            if(selectedAeroport) {
                const dataToSend: IFiltres = {
                    fin: new Date(endDateValue),
                    debut: new Date(beginDataValue),
                    aeroport: selectedAeroport
                };
                console.log(dataToSend);
                this.changeInput.emit(dataToSend);
            }
        }
    }
    ngOnInit() {
    }
}
