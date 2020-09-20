export interface IState {
  entity_id: string
  state: string
  attributes: any
  last_changed: Date
  last_updated: Date
  context: {
    id: string
    parent_id: string
    user_id: string
  }
}

export type IStateCallback = (newState: IState, oldState: IState | null) => void