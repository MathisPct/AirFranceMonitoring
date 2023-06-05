import {Component, OnDestroy} from '@angular/core';
import { IFiltres } from 'src/app/models/filtres.model';
import { Vol } from 'src/app/models/vol.model';
import { VolService } from '../../services/vol.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-view-airfrance',
  templateUrl: './view-airfrance.component.html',
  styleUrls: ['./view-airfrance.component.scss']
})
export class ViewAirFranceComponent implements OnDestroy {

  vols: Vol[] = [];
  private _subscriptions: Subscription = new Subscription();
  constructor(private _volService: VolService) { }

  /**
   * Réaction à la mise à jour des filtres
   * On souhaite récupérer les vols qui correspondent aux filtres passés en paramètre
   * en utilisant le service défini dans le constructeur
   * @param filtres récupérés depuis le composant enfant
   */
  onFiltresEvent(filtres: IFiltres): void {
    const subscription = this._volService.getVolsDepart(filtres.aeroport.icao, filtres.debut.getTime(), filtres.fin.getTime()).subscribe({
      next: newVols => this.vols = newVols,
      error: err => console.error(err)
    });
    this._subscriptions.add(subscription)
  }

  ngOnDestroy(): void {
      this._subscriptions.unsubscribe();
  }
}
