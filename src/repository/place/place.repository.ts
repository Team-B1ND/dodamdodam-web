import { dodamAxios } from "@src/lib/axios/customAxios";
import { PlacesResponse } from "@src/types/place/place.type";

class PlaceRepository {
  public async getPlaces(): Promise<PlacesResponse> {
    const { data } = await dodamAxios.get<PlacesResponse>("/place");
    return data;
  }
}

export default new PlaceRepository();
