import { Injectable, inject } from '@angular/core'
import { platform_stats }     from './model';
import { ApiClient }          from '../http/api-client';



@Injectable({providedIn:'root'})
export class PlatformService {
    readonly #http: ApiClient = inject(ApiClient);

    getStats() {
      return this.#http.get<platform_stats>("/platform/stats")
    }
}
