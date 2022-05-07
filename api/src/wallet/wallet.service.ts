import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
const {API_KEY} = process.env;

type Wallet = {
  status: number;
  message: string;
  result: string;
};



@Injectable()
export class WalletService {
  constructor(private httpService: HttpService) {}

  create(createWalletDto: CreateWalletDto) {
    return 'This action adds a new wallet';
  }

  findAll() {
    return `This action brings all wallets`;
  }

  findWalletBalance(address: string): Observable<AxiosResponse<any>> {
    
    return this.httpService.get(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=18ZCFNB2IT84VZP4IJQ3K9ITWM3RC47D66`)
    .pipe(
      map((response) => response.data)
    )    
    
  }

  findWalletEvents(address: string): Observable<AxiosResponse<any>> {
    // return `this ${address}`
    return this.httpService.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=18ZCFNB2IT84VZP4IJQ3K9ITWM3RC47D66`)
    .pipe(
      map((response) => response.data)
    )    
    
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}