import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import placeRepository from "@src/repository/place/place.repository";
import { PlacesResponse } from "@src/types/place/place.type";
import { QUERY_KEYS } from "../queryKey";

export const useGetPlacesQuery = (
  options?: UseQueryOptions<PlacesResponse, AxiosError, PlacesResponse, string>
) => useQuery(QUERY_KEYS.place.get, () => placeRepository.getPlaces(), options);
