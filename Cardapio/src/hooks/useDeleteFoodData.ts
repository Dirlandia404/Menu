import axios, { AxiosPromise } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FoodData } from "../interface/FoodData";

const API_URL = "http://localhost:8080";

// Função para realizar uma solicitação DELETE para excluir um item de comida
const deleteData = async ({ id }: FoodData): AxiosPromise<any> => {
  const response = axios.delete(`${API_URL}/food/${id}`);
  return response;
};

// Hook para criar uma mutação para excluir dados de comida
export function useDeleteFoodDataMutate() {
  const queryClient = useQueryClient();

  // UseMutation para criar a mutação para exclusão de dados de comida
  const mutate = useMutation({
    mutationFn: deleteData,
    retry: 2,
    // Executado quando a mutação é bem-sucedida
    onSuccess: () => {
      // Invalida a consulta de dados de comida para forçar uma atualização
      queryClient.invalidateQueries(["food-data"]);
    },
  });

  return mutate;
}
