import { StationsStatusData } from "./StationsStatusData.interface";

export interface StationsStatusResponse {
    last_updated: string;
    data: StationsStatusData;
}