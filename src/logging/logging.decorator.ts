import { Logger } from '@nestjs/common';

export const LogAroundDecorator =
  (action: string) =>
  (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => {
    const logger = new Logger();
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]) {
      try {
        logger.log({ message: `${action} started`, data: args });
        const result = await originalMethod.apply(this, args);
        logger.log({ message: `${action} completed`, data: args });
        return result;
      } catch (e) {
        logger.error({ message: `${action} failed`, error: e, data: args });
        throw e;
      }
    };
  };
