import { Module } from '@nestjs/common';
import { RecipeModule } from './recipe/recipe.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { PrismaService } from 'prisma/prisma.service';
// import { Abc } from './abc/abc';
// import { AbcGateway } from './abc/abc.gateway';
import { GroupModule } from './group/group.module';

@Module({
  imports: [RecipeModule, UserModule, AuthModule, PaymentsModule, GroupModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
