import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Wallet } from './models/wallet.model';
import { WalletModule } from './wallet/wallet.module';

@Module({  
  imports: [SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'blockchain',
    autoLoadModels: true,
    synchronize: true,
    models: [User, Wallet]
  }), WalletModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
