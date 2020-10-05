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
  queryParams?: Record<string, string | number | boolean>
  bodyParams?: Record<string, string | number | boolean>
}

type AsJson<T> = T extends string | number | boolean | null
  ? T
  : T extends Function
  ? never
  : T extends object
  ? { [K in keyof T]: AsJson<T[K]> }
  : never

export default function (
  oAuthOptions: OAuthOptions,
): <T>(requestOptions: RequestOptions) => Promise<T & AsJson<T>>
