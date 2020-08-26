import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { liveSearch } from '../live-search.operator';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-posts-search',
  templateUrl: './blog-posts-search.component.html',
  styleUrls: ['./blog-posts-search.component.css']
})
export class BlogPostsSearchComponent {
  private userIdSubject = new Subject<string>();

  // readonly blogPosts$ = this.userIdSubject.pipe(
  //   debounceTime(250),
  //   distinctUntilChanged(),
  //   switchMap(userId => this.blogService.fetchPosts(userId))
  // );

  readonly blogPosts$ = this.userIdSubject.pipe(
    liveSearch(userId => this.blogService.fetchPosts(userId))
  );

  constructor(private blogService: BlogService) { }

  searchPosts(userId: string) {
    this.userIdSubject.next(userId);
  }
}