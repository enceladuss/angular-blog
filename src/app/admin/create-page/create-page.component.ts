import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Post} from '../../shared/interfaces';
import {PostsService} from '../../shared/posts.service';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private PostsService: PostsService,
    private alert: AlertService
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required)
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const post: Post = {
      author: this.form.value.author,
      title: this.form.value.title,
      text: this.form.value.text,
      date: new Date()
    };

    this.PostsService.create(post).subscribe(() => {
      this.form.reset();
      this.alert.success('Post has been created!')
    });
  }
}
