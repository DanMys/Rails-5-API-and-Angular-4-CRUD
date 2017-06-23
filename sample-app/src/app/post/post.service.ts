import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Post } from './post';

@Injectable()
export class PostService {
  private postsUrl = 'http://localhost:3000/posts';

  constructor(private http: Http) {}

  getPosts(): Observable<Post[]> {
    return this.http.get(this.postsUrl)
      .map((response: Response) => <Post[]>response.json())
  }

  getPost(id: number) {
    return this.http.get(this.postsUrl + "/" + id + '.json')
  }

  createPost(post: Post): Observable<Post> {
    let headers = new Headers({'Content-Type':'application/json'});
    let options =  new RequestOptions({headers: headers});
    return this.http.post(this.postsUrl, JSON.stringify(post),
      options).map((res: Response) => res.json())
  }
}
