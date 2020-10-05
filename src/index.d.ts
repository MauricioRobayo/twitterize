export type OAuthOptions = {
  api_key: string
  api_secret_key: string
  access_token: string
  access_token_secret: string
}

export type RequestOptions = {
  subdomain?: string
  endpoint: string
  requestMethod?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  queryParams?: Record<string, string>
  bodyParams?: Record<string, string>
}

export default function (
  oAuthOptions: OAuthOptions,
): <T>(requestOptions: RequestOptions) => Promise<T>
