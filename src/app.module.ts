import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { AtGuard } from "./common/guards";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./auth/users/users.module";
import { CandidateModule } from "./candidate/candidate.module";
import { ElectionsModule } from "./elections/elections.module";

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UsersModule,
    CandidateModule,
    ElectionsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
