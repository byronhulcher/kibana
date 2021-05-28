/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';

import { EuiPageHeader } from '@elastic/eui';

import { CRAWLER_TITLE } from '.';

export const CrawlerOverview: React.FC = () => (
  <div data-test-subj="CrawlerOverview">
    <EuiPageHeader pageTitle={CRAWLER_TITLE} />
  </div>
);
