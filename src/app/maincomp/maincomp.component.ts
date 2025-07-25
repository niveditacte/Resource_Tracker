import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from '../home/home.component';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { DetailsComponent } from '../details/details.component';
import { HttpClientService } from '../Services/http-client.service';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
import { Renderer2 } from '@angular/core';
import { Resource } from '../interfaces';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-maincomp',
  standalone: true,
  imports: [KENDO_BUTTON, RouterOutlet,MatIconModule],
  templateUrl: './maincomp.component.html',
  styleUrl: './maincomp.component.scss'
})
export class MaincompComponent {
   resourcesArray:Array<Resource> = [];
  constructor(private httpClientService:HttpClientService,private router:Router,private renderer: Renderer2){}
  NavigateTab(route:string){
    this.router.navigate([route]);
  }
  
 
 
//  isDarkMode = false;


// ngOnInit(): void {
//     const savedTheme = localStorage.getItem('theme') || 'light';
//     this.isDarkMode = savedTheme === 'dark';
//     this.applyTheme(savedTheme);
//   }

//   toggleTheme(): void {
//     this.isDarkMode = !this.isDarkMode;
//     const theme = this.isDarkMode ? 'dark' : 'light';
//     this.applyTheme(theme);
//     localStorage.setItem('theme', theme);
//   }

//   private applyTheme(theme: string): void {
//     const body = document.body;
//     this.renderer.removeClass(body, 'light-mode');
//     this.renderer.removeClass(body, 'dark-mode');
//     this.renderer.addClass(body, `${theme}-mode`);
//   }
// }


}
