import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import placeRepository from "@src/repository/place/place.repository";
import { PlacesResponse } from "@src/types/place/place.type";

export const useGetPlacesQuery = (
  options?: UseQueryOptions<
    PlacesResponse,
    AxiosError,
    PlacesResponse,
    "place/getPlaces"
  >
) => useQuery("place/getPlaces", () => placeRepository.getPlaces(), options);
