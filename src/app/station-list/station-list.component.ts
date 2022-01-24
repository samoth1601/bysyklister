import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss']
})
export class StationListComponent implements OnInit {
  stations: station[] = []
  private lastUpdated: any = []
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getStations();
  }

  getStations() {
    const url = ' https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json'
    this.http.get<StationInformation>(url).subscribe((res) => {
      this.stations = res.data?.stations || [] ;
    })
  }
}

interface  station {
  station_id?: number;
  name?: string;
  address: string;
  lat: number;
  lon: number;
  capacity: number;
}

interface stationsData {
  stations: station[]
}

export interface StationInformation {
  last_updated?: string;
  data?:stationsData;
}