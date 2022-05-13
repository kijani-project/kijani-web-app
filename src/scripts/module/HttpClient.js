export class HttpClient {

  constructor(endPoint) {
    this.endPoint = endPoint;
  }

  /**
   * Create
   * @param body
   * @returns {Promise<any>}
   */
  post(body) {
    let requestOptions = {
      method: 'POST', redirect: 'follow', headers: {
        'Content-type': 'application/json'
      }, body: JSON.stringify(body)
    };

    return fetch(this.endPoint, requestOptions)
      .then(response => response.text());
  }

  /**
   * Read
   * @returns {Promise<any>}
   */
  get() {
    let requestOptions = {
      method: 'GET', redirect: 'follow', headers: {
        'Content-type': 'application/json'
      }
    };

    return fetch(this.endPoint, requestOptions)
      .then(response => response.json());
  }

  /**
   * Update
   * @param body
   * @returns {Promise<any>}
   */
  put(body) {
    let requestOptions = {
      method: 'PUT', redirect: 'follow', headers: {
        'Content-type': 'application/json'
      }, body: JSON.stringify(body)
    };

    return fetch(this.endPoint, requestOptions)
      .then(response => response.text())
  }

  /**
   * Delete
   * @returns {Promise<any>}
   */
  delete() {
    let requestOptions = {
      method: 'DELETE', redirect: 'follow', headers: {
        'Content-type': 'application/json'
      }
    };

    return fetch(this.endPoint, requestOptions)
      .then(response => response.text())
  }
}
