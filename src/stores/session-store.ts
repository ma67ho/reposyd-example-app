import { defineStore } from 'pinia';

export interface IRole {
  readonly Enabled: boolean
  readonly Name: string
}

export interface IProfile {
  AccountName: string
  EMail: string
  FirstName: string
  initials: string
  LastName: string
  PersonnelNumber: string
  Roles: IRole[]
  Uuid: string
}

interface State {
  profile: IProfile | null
}

export const useSessionStore = defineStore('session', {
  state: (): State => ({
    profile: null
  }),

  getters: {
    isAdministrator(): boolean {
      if (!this.profile) {
        return false
      }
      return this.profile.Roles.some(it => it.Name === 'Administrator')
    },
    isConnected(): boolean {
      return this.profile !== null
    },
  },

  actions: {
    reset() {
      this.profile = null
    }
  }
});
