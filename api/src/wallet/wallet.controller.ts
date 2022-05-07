import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return 'this.walletService.create(createWalletDto) o algo asi';
  }

  @Post('/user')
  createUser(@Body() createUserDto: CreateUserDto ): Promise<any> {
    return this.walletService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.walletService.findAll();
  }

  @Get(':address')
  findWalletBalance(@Param('address') address: string) {
    return this.walletService.findWalletBalance(address);
  }

  @Get('/events/:address')
  findWalletEvents(@Param('address') address: string) {
    return this.walletService.findWalletEvents(address);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(+id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.remove(+id);
  }
}
