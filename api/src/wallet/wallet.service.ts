import { HttpService } from '@nestjs/axios';
import { Injectable, Post } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { map, Observable } from 'rxjs';
import { User } from 'src/models/user.model';
import { Wallet } from 'src/models/wallet.model';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateWalletDto } from './dto/create-wallet.dto';




@Injectable()
export class WalletService {
  constructor(private httpService: HttpService) {}

  async createUserWallet(createWalletDto: CreateWalletDto) {
    const newWallet = new Wallet(createWalletDto)
    return await newWallet.save();
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = new User(createUserDto)     
    return await newUser.save()    
  }

  async findUser(email: string) {
    const userFound = await User.findOne({where: {email}, include: [{model: Wallet}]})
    return !userFound ? 'Email not registered' : userFound; 
  }

  findAll() {
    return `This action brings all wallets`;
  }

  async findWalletBalance(address: string): Promise<Observable<AxiosResponse<any, any>>> {
    
    return this.httpService.get(`https://api-goerli.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=18ZCFNB2IT84VZP4IJQ3K9ITWM3RC47D66`)
    .pipe(
      map((response) => response.data)
    )    
    
  }

  async findWalletEvents(address: string): Promise<Observable<AxiosResponse<any, any>>> {
    // return `this ${address}`
    return this.httpService.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=18ZCFNB2IT84VZP4IJQ3K9ITWM3RC47D66`)
    .pipe(
      map((response) => response.data)
    )    
    
  }

  removeWallet(w_address: string) {
    Wallet.destroy({where: {address: w_address}})
    
  }
}
