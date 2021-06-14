// --------------------------------------CONFIGURATION------------------------------------
// ---getCerts
interface WithFilesCerts {
  cert: string,
  key: string
}

interface EmptyObj { [n: string]: never }

export type Certs = WithFilesCerts | EmptyObj