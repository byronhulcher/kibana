/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';

import { i18n } from '@kbn/i18n';
import { FormattedMessage } from '@kbn/i18n/react';

export const DEFAULT_LANGUAGE = 'Universal';

export const META_ENGINE_CREATION_TITLE = i18n.translate(
  'xpack.enterpriseSearch.appSearch.metaEngineCreation.title',
  {
    defaultMessage: 'Create a meta engine',
  }
);

export const META_ENGINE_CREATION_FORM_TITLE = i18n.translate(
  'xpack.enterpriseSearch.appSearch.metaEngineCreation.form.title',
  {
    defaultMessage: 'Name your meta engine',
  }
);

export const META_ENGINE_CREATION_FORM_SUBMIT_BUTTON_LABEL = i18n.translate(
  'xpack.enterpriseSearch.appSearch.metaEngineCreation.form.submitButton.buttonLabel',
  {
    defaultMessage: 'Create meta engine',
  }
);

export const META_ENGINE_CREATION_FORM_META_ENGINE_DESCRIPTION = i18n.translate(
  'xpack.enterpriseSearch.appSearch.metaEngineCreation.form.metaEngineDescription',
  {
    defaultMessage:
      'Meta Engines allow you to combine multiple Engines into one, searchable Engine.',
  }
);

export const META_ENGINE_CREATION_FORM_DOCUMENTATION_LINK = i18n.translate(
  'xpack.enterpriseSearch.appSearch.metaEngineCreation.form.documentationLink',
  {
    defaultMessage: 'Read the Documentation',
  }
);

export const META_ENGINE_CREATION_FORM_DOCUMENTATION_DESCRIPTION = (
  <FormattedMessage
    id="xpack.enterpriseSearch.appSearch.metaEngineCreation.form.documentationDescription"
    defaultMessage="{documentationLink} for information about how to get started."
    values={{
      documentationLink: (
        <a
          href="https://www.elastic.co/guide/en/app-search/current/meta-engines-guide.html"
          target="_blank"
        >
          {META_ENGINE_CREATION_FORM_DOCUMENTATION_LINK}
        </a>
      ),
    }}
  />
);

export const META_ENGINE_CREATION_FORM_ENGINE_NAME_LABEL = i18n.translate(
  'xpack.enterpriseSearch.appSearch.metaEngineCreation.form.engineName.label',
  {
    defaultMessage: 'Engine name',
  }
);

export const ALLOWED_CHARS_NOTE = i18n.translate(
  'xpack.enterpriseSearch.appSearch.metaEngineCreation.form.engineName.allowedCharactersHelpText',
  {
    defaultMessage: 'Meta engine names can only contain lowercase letters, numbers, and hyphens',
  }
);

export const SANITIZED_NAME_NOTE = i18n.translate(
  'xpack.enterpriseSearch.appSearch.metaEngineCreation.form.engineName.sanitizedNameHelpText',
  {
    defaultMessage: 'Your meta engine will be named',
  }
);

export const META_ENGINE_CREATION_FORM_ENGINE_NAME_PLACEHOLDER = i18n.translate(
  'xpack.enterpriseSearch.appSearch.metaEngineCreation.form.engineName.placeholder',
  {
    defaultMessage: 'i.e., my-search-engine',
  }
);

export const META_ENGINE_CREATION_FORM_ENGINE_SOURCE_ENGINES_LABEL = i18n.translate(
  'xpack.enterpriseSearch.appSearch.metaEngineCreation.form.sourceEngines.label',
  {
    defaultMessage: 'Add engines to this meta engine',
  }
);
