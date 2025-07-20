import { Component } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  blogs: any[] = [];
  filteredBlogs: any[] = [];

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit() {
    this.blogs = this.blogService.fetchData();
    this.filteredBlogs = this.blogs;
  }

  formattedDate(date: string) {
    return new Date(date).toISOString().split('T')[0];
  }

  applyFilter(year: string) {
    if (year === '0') {
      this.filteredBlogs = this.blogService.fetchData();
      return;
    }

    this.filteredBlogs = this.blogs.filter((blog) => {
      const currentYear = new Date(year);

      return (
        new Date(blog.publishedDate)?.getFullYear() ===
        currentYear.getFullYear()
      );
    });
  }
}
