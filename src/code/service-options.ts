import { HttpClient } from "@angular/common/http";

export interface ServiceOptions {
    baseUrl: string;
    httpClient: HttpClient;
  }