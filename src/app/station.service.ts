import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StationsInformationResponse } from './interfaces/StationsInformationResponse.interface';
import { StationsStatusResponse } from './interfaces/StationsStatusResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private httpClient: HttpClient) { }

  getStationInformation(): Observable<StationsInformationResponse> {
    const headers = new HttpHeaders().set("Client-Identifier", "samoth1601-bysyklister");
    const url = 'https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json'
    return this.httpClient
      .get<StationsInformationResponse>(url, { headers })
  }

  getStationsStatus(): Observable<StationsStatusResponse> {
    const headers = new HttpHeaders().set("Client-Identifier", "samoth1601-bysyklister");
    const url = 'https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json'
    return this.httpClient
      .get<StationsStatusResponse>(url, { headers })
  }
}
