import { AxiosGet } from "../UIApiHelperService";
import { ApiAvailabilityModel, GetLoggedInUserResponse } from "./UIApiServiceInterfaces";

export function CheckApiAvailability(): Promise<boolean> {
    return AxiosGet<ApiAvailabilityModel>("Status")
        .then((request) => {
            return true;
        })
        .catch((error) => {
            console.log(error);
            return false;
        });
}

export function GetUsername(): Promise<string> {
    return AxiosGet<GetLoggedInUserResponse>("Login/GetLoggedInUser")
        .then((response) => {
            return response.data.username;
        })
        .catch(() => {
            return "";
        });
}

export function IsStreamerOnline(channelName: string) {
    return AxiosGet<boolean>(`Status/Streamer?broadcaster=${channelName}`)
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            return false;
        });
}
