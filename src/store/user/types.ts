export interface UserInfoInterface {
  bill: number;
  firstName: string;
}

export interface IExchangeRates {
  base: string;
  date: string;
  rates: {
    [key: string]: number
  }[]
}

export interface UserStateInterface {
  uid: string | null;
  info: UserInfoInterface | null;
  exchangeRates: IExchangeRates | null;
}
