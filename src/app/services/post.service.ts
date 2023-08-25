import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, finalize } from 'rxjs';
import { IPost, IPostApi } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  loadingPosts$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getPosts(page: number): Observable<IPost[]> {
    this.loadingPosts$.next(true);

    return this.http
      .get<IPostApi>(`https://dummyjson.com/posts?limit=10&skip=${page * 10}`)
      .pipe(
        map((data) => data.posts),
        finalize(() => {
          this.loadingPosts$.next(false);
        })
      );
  }
}
