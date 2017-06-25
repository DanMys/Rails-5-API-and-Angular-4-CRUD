import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Post } from './post';

@Injectable()
export class PostService {
  headers: Headers;
  options: RequestOptions;
  private postsUrl = 'http://localhost:3000/posts';

  constructor(private http: Http) {
    this.headers = new Headers({'Content-Type':'application/json'});
    this.options =  new RequestOptions({headers: this.headers});
  }

  getPosts(): Observable<Post[]> {
    return this.http.get(this.postsUrl)
      .map((response: Response) => <Post[]>response.json())
  }

  getPost(id: number) {
    return this.http.get(this.postsUrl + "/" + id + '.json')
  }

  createPost(post: Post): Observable<Post> {
  return this.http.post(this.postsUrl, JSON.stringify(post),
      this.options).map((res: Response) => res.json());
  }

  deletePost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.delete(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updatePost(post: Post): Observable<Post> {
    const url = `${this.postsUrl}/${post.id}`;
    return this.http.put(url, JSON.stringify(post),
      this.options).map((res: Response) => res.json());
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error)
    return Promise.reject(error.message || error);
  }
}
