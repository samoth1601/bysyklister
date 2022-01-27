import { StationsInformationData } from "./StationsInformationData.interface";

export interface StationsInformationResponse {
    last_updated: string;
    data: StationsInformationData;
}