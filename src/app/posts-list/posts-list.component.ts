import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../models/post.model';
import {Subscription} from 'rxjs';
import {PostsService} from '../services/posts.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';



@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})



export class PostsListComponent implements OnInit , OnDestroy{


  posts: Post[];
  filteredPosts: Post[];
  postsSubscription: Subscription;
  @Input() likes;
  @Input() unlikes;


  private _searchPost: string;
  // @ts-ignore
  get searchPost(): string {
    return this._searchPost;
  }
  set searchPost(value: string) {
    this._searchPost = value;
    this.filteredPosts = this.filterPosts(value);
  }

  filterPosts(searchString: string) {
    return this.posts.filter(posts => posts.title.toLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1);
  }

  constructor(private postsService: PostsService, private router: Router) { }


  ngOnInit() {
    this.postsSubscription = this.postsService.postsSubject.subscribe(
     posts => {
       this.posts = posts;
       this.filteredPosts = this.posts;
     }
   );
    this.postsService.getPost();
    this.postsService.emitPosts();
  }

  onNewPost() {
    this.router.navigate(['/posts', 'new']);
  }

  onDeletePost(post: Post) {
    this.postsService.removePost(post);
  }

  like(post) {
    post.likes += 1;
  }

  unlike(post) {
    post.unlikes += 1;
  }

  getDate() {
    const date = new Date();
    return date;
  }

  onViewPost(id: number) {
    this.router.navigate(['/posts', 'view', id]);
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }


}
