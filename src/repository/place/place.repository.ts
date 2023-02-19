import { dodamV6Axios } from "../../lib/axios/customAxios";
import { PlacesResponse } from "../../types/place/place.type";

class PlaceRepository {
  public async getPlaces(): Promise<PlacesResponse> {
    const { data } = await dodamV6Axios.get<PlacesResponse>("/place");
    return data;
  }
}

export default new PlaceRepository();
