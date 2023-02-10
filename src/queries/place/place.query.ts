import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import placeRepository from "../../repository/place/place.repository";
import { PlacesResponse } from "../../types/place/place.type";

export const useGetPlacesQuery = (
  options?: UseQueryOptions<
    PlacesResponse,
    AxiosError,
    PlacesResponse,
    "place/getPlaces"
  >
) => useQuery("place/getPlaces", () => placeRepository.getPlaces(), options);
