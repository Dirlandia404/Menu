import axios, { AxiosPromise } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FoodData } from "../interface/FoodData";
const API_URL = "http://localhost:8080";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const postData = async (data: FoodData): AxiosPromise<any> => {
  const response = axios.post(API_URL + "/food", data);
  return response;
};

export function useFoodDataMutate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: postData,
    retry: 2,

    onSuccess: () => {
      queryClient.invalidateQueries(["food-data"]);
    },
  });
  return mutate;
}
