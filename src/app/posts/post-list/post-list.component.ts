import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Post } from '../post.model'
import { PostService } from '../posts.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {

  // posts=[
  //   {title:'first',content:'first post'},
  //   {title:'second',content:'second post'},
  //   {title:'third',content:'third post'}
  // ]
posts: Post[]=[]
totalPosts=0;
postsPerPage=2;
pageSizeOptions=[1,2,5,10];
currentPage=1;
userId:string;
private authStatusSub:Subscription;
isLoading=false;

userIsAuthenticated=false;
private postSub:Subscription;
  constructor(private postService:PostService, private authService:AuthService) { }

  ngOnInit(): void {
    this.isLoading=true;
    this.postService.getPosts(this.postsPerPage,this.currentPage);
    this.userId=this.authService.getUserId();
    this.postSub = this.postService.getPostsUpdatedListener().subscribe((postData:{posts:Post[],postCount:number})=>{
      this.isLoading=false;
      this.totalPosts=postData.postCount;
      this.posts=postData.posts;
    });
    this.userIsAuthenticated=this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
      this.userId=this.authService.getUserId(); //changes user id when login changes
      this.userIsAuthenticated=isAuthenticated;
    })
  }
  onChangedPage(pageData:PageEvent){
    this.isLoading=true;
    this.currentPage=pageData.pageIndex+1;
    this.postsPerPage=pageData.pageSize;
    this.postService.getPosts(this.postsPerPage,this.currentPage);
  }
  onDelete(postId:string){
    this.postService.deletePost(postId).subscribe(()=>{
      this.postService.getPosts(this.postsPerPage,this.currentPage);
    },()=>{
      this.isLoading=false;
    })
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }


}
