import axios from "axios";
import qs from "qs";
import env from "~/env";

axios.defaults.paramsSerializer = params => {
  return qs.stringify( params, { arrayFormat: 'comma' })
}
axios.defaults.baseURL = env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: env.REACT_APP_API_URL
})

export default instance