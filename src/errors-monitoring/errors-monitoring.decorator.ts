import { SetMetadata } from '@nestjs/common';

export const ERRORS_MONITORING_KEY = Symbol('ERRORS_MONITORING');

export const ErrorsMonitoring = SetMetadata(ERRORS_MONITORING_KEY, true);
