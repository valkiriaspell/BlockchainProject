import { HttpModule } from '@nestjs/axios';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
  HttpModule.registerAsync({
    useFactory: () => ({
      timeout: 5000,
      maxRedirects: 5,
    }),
  })
],
  controllers: [WalletController],
  providers: [WalletService]
})
export class WalletModule {}
