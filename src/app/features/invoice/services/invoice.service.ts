import {Injectable} from '@angular/core';
import {ResourceService} from '../../../core/services/resource.service';
import {Invoice, InvoiceDetail, InvoiceStatus} from '../models/invoice.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../../core/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends ResourceService<Invoice>{

  constructor(http: HttpClient) {
    super(http);
    this.setApiUrl("factures")
  }

  getAllByClient(clientId: number | string, page: {index: number, limit: number} = {index: 1, limit: 10}): Observable<ApiResponse<Invoice[]>>{
    let params = new HttpParams();
    params = params
      .set('page', page.index.toString())
      .set('limit', page.limit.toString());
    const preparedUrl = `${this.apiUrl}/clients/${clientId}`

    return this.http.get<ApiResponse<Invoice[]>>(preparedUrl, {params});
  }

  getDetails(invoiceId: string): Observable<ApiResponse<InvoiceDetail>>{
    const preparedUrl = `${this.apiUrl}/details/${invoiceId}`

    return this.http.get<ApiResponse<InvoiceDetail>>(preparedUrl)
  }

  paid(invoiceId: string): Observable<ApiResponse<InvoiceDetail>>{
    const preparedUrl = `${this.apiUrl}/PayerFacture/${invoiceId}`

    return this.http.get<ApiResponse<InvoiceDetail>>(preparedUrl)
  }



  getStatusClass(status: InvoiceStatus): string{
    if (status === InvoiceStatus.PAID){
      return "success"
    }else if(status === InvoiceStatus.PENDING){
      return "warning"
    }
    return "secondary";
  }
}
