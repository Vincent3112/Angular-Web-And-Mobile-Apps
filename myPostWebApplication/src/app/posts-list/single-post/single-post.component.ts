import { Component, OnInit } from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from '../../models/post.model';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {

  post: Post;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private postsService: PostsService) { }

  ngOnInit() {
    this.post = new Post('', '', new Date(), 0, 0);
    const id = this.route.snapshot.params['id'];
    this.postsService.getSinglePost(+id).then(
      (post: Post) => {
        this.post = post;
      }
    );
  }

  onBack() {
    this.router.navigate(['/posts']);
  }


}
