import {Component, OnDestroy, OnInit} from '@angular/core';
import {IFiltres} from 'src/app/models/filtres.model';
import {Vol} from 'src/app/models/vol.model';
import {VolService} from '../../services/vol.service';
import {Subscription} from "rxjs";
import {PassagerService} from "../../services/passager.service";
import {Passager} from "../../models/passager.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-airfrance',
  templateUrl: './view-airfrance.component.html',
  styleUrls: ['./view-airfrance.component.scss']
})
export class ViewAirFranceComponent implements OnDestroy, OnInit {

  vols: Vol[] = [];
  passagers: Passager[] = [];
  type!: 'decollages' | 'atterissages';
  private _subscriptions: Subscription = new Subscription();

  constructor(
    private _volService: VolService,
    private _passagerService: PassagerService,
    private _activatedRoute: ActivatedRoute
  ) {
  }

  public selectVol(vol: Vol) {
    this._passagerService.getPassager(vol.icao).subscribe({
      next: generatedPassagers => {
        this.passagers = generatedPassagers
      }
    })
  }

  /**
   * Réaction à la mise à jour des filtres
   * On souhaite récupérer les vols qui correspondent aux filtres passés en paramètre
   * en utilisant le service défini dans le constructeur
   * @param filtres récupérés depuis le composant enfant
   */
  onFiltresEvent(filtres: IFiltres): void {
    let subscription : Subscription;
    if(this.type == 'decollages'){
      subscription = this._volService.getVolsDepart(filtres.aeroport.icao, filtres.debut.getTime(), filtres.fin.getTime()).subscribe({
        next: newVols => this.vols = newVols,
        error: err => console.error(err)
      });
    }else{
       subscription = this._volService.getVolsArrivee(filtres.aeroport.icao, filtres.debut.getTime(), filtres.fin.getTime()).subscribe({
        next: newVols => this.vols = newVols,
        error: err => console.error(err)
      });
    }
    this._subscriptions.add(subscription)
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    const subscription = this._activatedRoute.data.subscribe((data$)=>{
      this.type = data$['type']??'decollages';
      }
    )
    this._subscriptions.add(subscription);
  }
}
