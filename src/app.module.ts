import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AuthModule } from './modules/auth/auth.module';
import { ImgUploadModule } from '@core/imageUploader/img-upload.module';
import { GlobalModule } from '@core/globalModules/global.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    CategoriesModule,
    AuthModule,
    GlobalModule,
    ImgUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
