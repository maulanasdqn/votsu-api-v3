import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      datasources: {
        db: {
          url: 'postgresql://admin:admin@localhost:5432/votsu-db?schema=public',
        },
      },
    });
  }
  async onModuleInit() {
    try {
      await this.$connect();
    } catch (err) {
      throw new Error('Method not implemented.');
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
    } catch (err) {}
    throw new Error('Method not implemented.');
  }
}
