export interface StationStatusData {
    station_id: number;
    is_installed: number;
    is_renting: number;
    num_bikes_available: number;
    num_docks_available: number;
    last_reported: number;
    is_returning: number;
}