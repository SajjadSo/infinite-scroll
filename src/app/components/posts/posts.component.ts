import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  page = 0;
  posts: IPost[] = [];
  loadingPosts$ = this.postService.loadingPosts$;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService
      .getPosts(this.page)
      .subscribe((posts: IPost[]) => (this.posts = posts));
  }

  onScroll(): void {
    this.postService.getPosts(++this.page).subscribe((posts: IPost[]) => {
      this.posts.push(...posts);
    });
  }
}
