

export interface RequestOptions<TDTO, TPOCO> {
    url?: string;
    transform?: (dto: TDTO) => TPOCO;
    latest?: boolean;
    keep? :((item:TPOCO)=>boolean) | boolean;
  }