import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'hello',
  template: `<a [href]="fileUrl" download="file.pdf">DownloadFile</a>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
  @Input() name: string;
  public fileUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private http:HttpClient
  ) {}

  ngOnInit(){
    this.getPdf().subscribe(e => {
      console.log(e);
      //var file = new Blob([e['blob']], {type: 'application/pdf'});
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(e));
      console.log(this.fileUrl);
    })
  }

  private getPdf(){
    console.log('call getPdf()');
    //return this.http.get('https://us-central1-element-services.cloudfunctions.net/pdf/paymentDocument');

    return this.http.post('https://us-central1-element-services.cloudfunctions.net/pdf/paymentDocument', {}, { responseType: 'blob' });

  }

}
