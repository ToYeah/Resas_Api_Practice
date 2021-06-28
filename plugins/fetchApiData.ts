import axios, { AxiosResponse } from 'axios'

export const RESASAPI_ROOT = 'https://opendata.resas-portal.go.jp'

export const fetchApiData = async (
  requestEndPoint: string,
  apiToken: string,
  params: { [key: string]: string }
): Promise<AxiosResponse<any> | null> => {
  const requestUri = new URL(requestEndPoint, RESASAPI_ROOT)
  const response = await axios
    .get(requestUri.toString(), {
      headers: {
        'X-API-KEY': apiToken,
      },
      params,
    })
    .catch(() => {
      return null
    })
  return response
}
