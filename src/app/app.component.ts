import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'imsappp';
  isLoading: boolean = false;

  ngOnInit(): void {
  this.loadData(); 
  }

  

  loadData() {
    this.isLoading = true;

    // Simulating an asynchronous operation
    setTimeout(() => {
      // Your data loading logic

      this.isLoading = false;
    }, 1600);
  }




}
