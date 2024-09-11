import TeddyApi from 'utils/TeddyApi';
import axios, { AxiosResponse } from 'axios';

  export const getAll = async (): Promise<AxiosResponse<any>> => {
    try {
      const response = await TeddyApi.get('/');
      return response;
    } catch (error) {
      console.error('Erro ao fazer o GET:', error);
      throw error;
    }
  };
  
  export const cadastrar = async (data: any, after: any): Promise<AxiosResponse<any>> => {
    try {
      const response = await TeddyApi.post('/', data);
      after();
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer o POST:', error);
      throw error;
    }
  };

  export const excluir = async (id: any): Promise<AxiosResponse<any>> => {
    try {
      const response = await TeddyApi.delete('/' + id);
      return response;
    } catch (error) {
      console.error('Erro ao fazer o DELETE:', error);
      throw error;
    }
  };

  export const atualizar = async (id: any, data: any, after: any): Promise<AxiosResponse<any>> => {
    try {
      const response = await TeddyApi.put('/' + id, data);
      after();
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer o POST:', error);
      throw error;
    }
  };