import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.css']
})

export class TermsOfServiceComponent implements OnInit {
  // used to check if the user has red the tos
  endReached: boolean
  // used to validate the tos validation btn
  isCbChecked: boolean
  // when the user validates the terms, its content will be hidden
  hasValidatedTerms: boolean

  constructor(private location: Location) { }

  ngOnInit() {
    this.endReached = false
    this.isCbChecked = false
    this.hasValidatedTerms = false;
  }

  /** making sure user scroll to end 
   * before activating the checkbox button
  */
  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
      // visible height + pixel scrolled >= total height 
      if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
        this.endReached = true;        
      }
  }

  /**  redirect to auth page */
  goBack() {
    this.location.back();
  }
}
