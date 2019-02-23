export interface Action<M, T> {
  readonly type: T
  readonly payload?: {
    readonly items?: ReadonlyArray<M>
    readonly error?: string
  }
}

export interface State<M> {
  readonly items: ReadonlyArray<M>
  readonly error: string
  readonly isLoading: boolean
}

// TODO: model, does not belong here
export interface Account {
  readonly email: string
  readonly firstName: string
  readonly hasAccess: boolean
  readonly isAdmin: boolean
  readonly lastName: string
}
