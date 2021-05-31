/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { schema, TypeOf } from '@kbn/config-schema';
import { PluginConfigDescriptor, PluginInitializerContext } from 'src/core/server';

import { EnterpriseSearchPlugin } from './plugin';

export const configSchema = schema.object({
  host: schema.maybe(schema.string()),
  enabled: schema.boolean({ defaultValue: true }),
  accessCheckTimeout: schema.number({ defaultValue: 5000 }),
  accessCheckTimeoutWarning: schema.number({ defaultValue: 300 }),
  ssl: schema.object({
    certificateAuthorities: schema.maybe(
      schema.oneOf([schema.arrayOf(schema.string()), schema.string()])
    ),
    rejectUnauthorized: schema.boolean({ defaultValue: false }),
  }),
});

export type ConfigType = TypeOf<typeof configSchema>;

export const config: PluginConfigDescriptor<ConfigType> = {
  schema: configSchema,
  exposeToBrowser: {
    host: true,
  },
};

export const plugin = (initializerContext: PluginInitializerContext) => {
  return new EnterpriseSearchPlugin(initializerContext);
};
