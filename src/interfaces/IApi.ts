import { IState } from './IState';


export interface IApi {
  getState: (entityId: string) => Promise<IState>,
  callService: (domain: string, service: string, entityId: string, data?: any) => void
}