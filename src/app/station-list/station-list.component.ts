import { Component, OnInit } from '@angular/core';
import { Station } from '../interfaces/Station.interface';
import { StationService } from '../station.service';
import { lastValueFrom } from 'rxjs';
import { StationsInformationData } from '../interfaces/StationsInformationData.interface';
import { StationsStatusData } from '../interfaces/StationsStatusData.interface';

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss']
})
export class StationListComponent implements OnInit {
  stationMap = new Map<number, Station>();
  dataSource: Station[] = [];
  displayedColumns: string[] = ['Stativ', 'Ledige sykler', 'Ledige låser'];

  constructor(private stationService: StationService) { }

  ngOnInit(): void {
    this.initializeStations().then(stations => this.dataSource = stations);
  }

  private async initializeStations() {
    const stationsInformationData: StationsInformationData = (await lastValueFrom(this.stationService.getStationInformation())).data || [];
    const stationsStatusData: StationsStatusData = (await lastValueFrom(this.stationService.getStationsStatus())).data || [];

    var stationMap = new Map<number, Station>(
      stationsInformationData.stations.map(stationInformation =>
        [stationInformation.station_id, {
          stationName: stationInformation.name,
          stationAvailableBikes: undefined as unknown as number,
          stationAvailableDocks: undefined as unknown as number
        }]
      )
    );

    stationsStatusData.stations.forEach(
      stationStatus => {
        const station = stationMap.get(stationStatus.station_id);
        if (station) {
          station.stationAvailableBikes = stationStatus.num_bikes_available;
          station.stationAvailableDocks = stationStatus.num_docks_available;
        }
      }
    );
    return Array.from(stationMap.values())
  }
}
