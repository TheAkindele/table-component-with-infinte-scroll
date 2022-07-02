import axios, {
    AxiosError, 
    AxiosInstance, 
    AxiosRequestConfig, 
    AxiosResponse 
} from 'axios';
   
   // https://jsonplaceholder.typicode.com/photos
const BASE_URL = 'https://jsonplaceholder.typicode.com';
   
const getToken = async () => localStorage.getItem('token');
const removeToken = async () => localStorage.removeItem('token');
   
function ApiResource() {
    const api = axios.create({
           baseURL: BASE_URL,
           headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json',
               'Access-Control-Allow-Methods': '*',
               'Access-Control-Allow-Origin': BASE_URL,
           },
    }) as AxiosInstance;
   
       api.interceptors.request.use(
           async (config: AxiosRequestConfig) => {
               if (config?.headers) {
                   const token = await getToken();
                   if (!token) return config;
   
                   config.headers['Authorization'] = `Bearer ${token}`;
                   return config;
               }
           },
           (error: AxiosError) => Promise.reject(error)
       );
   
       api.interceptors.response.use(
           (response: AxiosResponse) => response,
           (error: AxiosError) => {
               const errorData = error?.response?.data as Record<string, string | object>;
   
               if (error.response === undefined) {
                   // show a toast here
                   console.log('Error: No internet connection!');
               } else {
                   if (+errorData?.code === 401) {
                       const message = (errorData?.description || error?.message) as string;
                       // show a toast here
                       console.log('Error: ', message);
                       removeToken();
                       // return navigate(ROUTES.LOGIN);
                   }
               }
   
               return Promise.reject(errorData);
           });
   
    return {
           get: (url: string) => api.get(url).then(({ data }) => data),
   
           post: (args: [string, object]) => api.post(...args).then(({ data }) => data),
   
           patch: (args: [string, object]) => api.patch(...args).then(({ data }) => data),
   
           put: (args: [string, object]) => api.put(...args).then(({ data }) => data),
   
           delete: (url: string) => api.delete(url).then(({ data }) => data),
    }
}
   
export const api = ApiResource();
   