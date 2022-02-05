import { Location } from '@angular/common';
import { HttpRequest } from '@angular/common/http';

export class RequestUtils {
  static includeLangHeader(
    req: HttpRequest<any>,
    lang: string,
  ): HttpRequest<any> {
    let headers = req.headers;
    headers = headers.set('Accept-Language', lang);
    return req.clone({ headers });
  }

  static includeAuthHeader(
    req: HttpRequest<any>,
    token: string,
  ): HttpRequest<any> {
    let headers = req.headers;
    headers = headers.set('Authorization', 'Bearer ' + token);
    return req.clone({ headers });
  }

  /**
   * Joins multiple subpaths with one single slash
   */
  static joinWithSlash(...paths: any[]): string {
    let path = '';
    paths
      .filter(obj => obj && obj !== null)
      .map(obj => String(obj))
      .filter(str => 0 < str.length)
      .forEach(sub => {
        path = Location.joinWithSlash(path, sub);
      });
    return path;
  }
}
