import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PetsModule } from './pets/pets.module';
import { PhotosModule } from './photos/photos.module';
import { LikesModule } from './likes/likes.module';
import { DislikeModule } from './dislike/dislike.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: '',
      database: 'perrinder',
      host: '127.0.0.1',
      port: 3306,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    PetsModule,
    PhotosModule,
    LikesModule,
    DislikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
