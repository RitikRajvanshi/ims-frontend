import { Injectable } from '@angular/core';
// import { environment } from '../environments/environment.dev';
import { HttpClient, HttpHeaders, HttpEventType  } from '@angular/common/http';
import { environment } from '../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(private httpClient:HttpClient) { }

  uploadFileandgetData(formdata:FormData){
    let url = environment.BASE_URL + environment.FILES.UPLOADFILEANDGETDATA

    return this.httpClient.post(url, formdata, {
      reportProgress: true, // Enables progress tracking
      observe: 'events'     // Receive HttpEvents to track progress
    });
  }

    //for full data uploadation/updation
    uploadInvoiceinpo(formdata:any){
      let url = environment.BASE_URL + environment.FILES.UPLOADINVOICEINPO
  
      return this.httpClient.post(url, formdata);
    }

  //It's use when have to update partial data without file type i.e invoice no.
    updateInvoicenoinpo(data:any){
      let url = environment.BASE_URL + environment.FILES.UPDATEINVOICENOINPO
  
      return this.httpClient.post(url, data);
    }

    uploadscanDocument(formdata:any){
      let url = environment.BASE_URL + environment.FILES.UPLOADSCANDOCUMENT
  
      return this.httpClient.post(url, formdata);
    }

    
  updateDocotherthanFile(data:any){
    let url = environment.BASE_URL + environment.FILES.UPDATEDOCOTHERTHANFILE

    return this.httpClient.post(url, data);
  }

  updatefullDoc(data:any){
    let url = environment.BASE_URL + environment.FILES.UPDATEFULLDOCUMENT

    return this.httpClient.post(url, data);
  }

  //QUOTATION
  uploadQuotation(formdata:any){
    let url = environment.BASE_URL + environment.FILES.UPLOADQUOTATION

    return this.httpClient.post(url, formdata);
  }

  updateQuatationotherthanFile(data:any){
    let url = environment.BASE_URL + environment.FILES.UPDATEQUOTATIONOTHERTHANFILE

    return this.httpClient.post(url, data);
  }

  updatefullQuotation(data:any){
    let url = environment.BASE_URL + environment.FILES.UPDATEFULLQUOTATION

    return this.httpClient.post(url, data);
  }
}
