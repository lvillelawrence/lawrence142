import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["overlay", "checkbox"]

  connect() {
    // Check if user has already dismissed the popup
    const popupDismissed = localStorage.getItem('popupDismissed')
    
    if (!popupDismissed) {
      // Show the popup
      this.overlayTarget.style.display = 'flex'
    }
  }

  close() {
    // Just close the popup for this session
    this.overlayTarget.style.display = 'none'
  }

  dismiss() {
    // Check if checkbox is checked
    if (!this.checkboxTarget.checked) {
      alert('Please check "I agree" before dismissing.')
      return
    }
    
    // Mark as dismissed in localStorage and close
    localStorage.setItem('popupDismissed', 'true')
    this.overlayTarget.style.display = 'none'
  }
}

