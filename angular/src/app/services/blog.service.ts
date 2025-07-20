import { Injectable } from '@angular/core';
import { blogs } from '../../assets/json/blogs.json';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  fetchData() {
    return blogs;
  }

  fetchLatest() {
    return [blogs[0], blogs[1]];
  }
}
