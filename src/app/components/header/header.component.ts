import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainPageMediaService } from '../../services/mainPageMediaService/main-page-media.service';
import { MainPageMedia } from '../../models/mainPageMedia/main-page-media';
import { CommonModule } from '@angular/common';
import { HandleResponse } from '../../handlingResponse/handle-response';
import { AccountService } from '../../services/accountService/account.service';
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [RouterModule, CommonModule],
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  addMedia($event: any) {
    const file = $event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const formData = new FormData();
      formData.append('media', file);
      this.MainPageMediaService.addMedia(formData).subscribe({
        next: (response) => {
          this.mainPageMedias.push(response.entity);
        },
      });
    } else {
      HandleResponse.handleError('Please select a valid image file.');
    }
  }
  editMedia($event: any, id: number) {
    const file = $event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const formData = new FormData();
      formData.append('id', id.toString());
      formData.append('media', file);
      this.MainPageMediaService.updateMedia(formData).subscribe({
        next: (response) => {
          this.mainPageMedias.map((media) => {
            if (media.id == response.entity.id) {
              console.log(response);
              media = response.entity;
              console.log(media);
            }
          });
        },
      });
    } else {
      HandleResponse.handleError('Please select a valid image file.');
    }
  }
  async handleMedia(id: number) {
    const confirmed = await HandleResponse.operationConfirmed(
      'what do you want for this photo',
      'Edit',
      'Delete'
    );
    if (confirmed) {
      document.getElementById('MediaInput' + id)?.click();
    } else {
      this.handleDeletion(id);
    }
  }
  async handleDeletion(id: number) {
    const confirmed = await HandleResponse.operationConfirmed(
      'sure you want to delete this media'
    );
    if (confirmed) {
      this.MainPageMediaService.deleteMedia(id).subscribe({
        next: (response) => {
          this.mainPageMedias = this.mainPageMedias.filter(
            (media) => media.id != id
          );
        },
      });
    }
  }
  mainPageMedias: MainPageMedia[] = [];
  constructor(
    private MainPageMediaService: MainPageMediaService,
    public accountService: AccountService
  ) {
    this.MainPageMediaService.getAll().subscribe({
      next: (data) => {
        this.mainPageMedias = data.entity;
      },
    });
  }
  isShow: boolean = false;
  topPosToStartShowing = 100; // Scroll position to start showing the button

  // Listen to window scroll event to check if we need to show the button
  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    // Show or hide the button based on scroll position
    this.isShow = scrollPosition >= this.topPosToStartShowing;
  }

  // Smooth scroll to the top of the page
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
