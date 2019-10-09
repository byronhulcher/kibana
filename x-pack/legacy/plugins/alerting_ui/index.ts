/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { Legacy } from 'kibana';
import { Root } from 'joi';

export function alertingUI(kibana: any) {
  return new kibana.Plugin({
    id: 'alerting_ui',
    configPrefix: 'xpack.alerting_ui',
    require: ['kibana', 'actions'],
    isEnabled(config: Legacy.KibanaConfig) {
      return (
        config.get('xpack.alerting_ui.enabled') === true &&
        config.get('xpack.actions.enabled') === true
      );
    },
    config(Joi: Root) {
      return Joi.object()
        .keys({
          enabled: Joi.boolean().default(false),
        })
        .default();
    },
  });
}
