import { dodamV3Axios } from "../../lib/axios/customAxios";
import { PlacesResponse } from "../../types/place/place.type";

class PlaceRepository {
  public async getPlaces(): Promise<PlacesResponse> {
    const { data } = await dodamV3Axios.get<PlacesResponse>("/place");
    return data;
  }
}

export default new PlaceRepository();
