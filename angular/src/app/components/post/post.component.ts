import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { CarouselComponent } from '../carousel/carousel.component';

interface Blog {
  id: string;
  title: string;
  image: string;
  type: string;
  description: string;
  publishedDate: string;
  blogInfo: {
    carouselImage: string[];
    postBy: string;
    desc: string;
  };
}

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [MatIcon, RouterLink, CarouselComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  constructor(
    private router: Router,
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {}
  blogId: string = '';
  blogs: any[] = [];
  related: any[] = [];
  currentBlog: Blog | any = {
    id: '',
    title: '',
    image: '',
    type: '',
    description: '',
    publishedDate: '',
    blogInfo: {
      carouselImage: [],
      postBy: '',
      desc: '',
    },
  };

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('blogId');
      if (id) {
        this.fetchBlog(id);
      }
    });

    this.blogId = this.router.url.split('/')[2];
    this.blogs = this.blogService.fetchData();
    this.currentBlog = this.blogs?.filter(
      (blog) => blog.id === this.blogId
    )?.[0];
    this.related = this.blogs.filter((blog) => {
      return (
        blog.id !== this.currentBlog.id && blog.type === this.currentBlog.type
      );
    });
  }

  fetchBlog(id: string) {
    this.currentBlog = this.blogs?.filter((blog) => blog.id === id)?.[0];
  }

  formattedDate(date: string) {
    return new Date(date)?.toLocaleDateString();
  }
}
