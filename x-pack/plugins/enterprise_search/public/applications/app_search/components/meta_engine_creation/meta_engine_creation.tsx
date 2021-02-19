/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useEffect } from 'react';

import { useActions, useValues } from 'kea';

import {
  EuiCallOut,
  EuiComboBox,
  EuiComboBoxOptionOption,
  EuiForm,
  EuiFlexGroup,
  EuiFormRow,
  EuiFlexItem,
  EuiFieldText,
  EuiPageBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiSpacer,
  EuiText,
  EuiTitle,
  EuiButton,
  EuiPanel,
} from '@elastic/eui';

import { FlashMessages } from '../../../shared/flash_messages';
import { SetAppSearchChrome as SetPageChrome } from '../../../shared/kibana_chrome';
import { AppLogic } from '../../app_logic';

import {
  ALLOWED_CHARS_NOTE,
  META_ENGINE_CREATION_FORM_DOCUMENTATION_DESCRIPTION,
  META_ENGINE_CREATION_FORM_ENGINE_NAME_LABEL,
  META_ENGINE_CREATION_FORM_ENGINE_NAME_PLACEHOLDER,
  META_ENGINE_CREATION_FORM_ENGINE_SOURCE_ENGINES_LABEL,
  META_ENGINE_CREATION_FORM_MAX_SOURCE_ENGINES_WARNING_TITLE,
  META_ENGINE_CREATION_FORM_META_ENGINE_DESCRIPTION,
  META_ENGINE_CREATION_FORM_SUBMIT_BUTTON_LABEL,
  META_ENGINE_CREATION_FORM_TITLE,
  META_ENGINE_CREATION_TITLE,
  SANITIZED_NAME_NOTE,
} from './constants';
import { MetaEngineCreationLogic } from './meta_engine_creation_logic';

const engineNameToComboBoxOption = (engineName: string): EuiComboBoxOptionOption<string> => ({
  label: engineName,
});

const comboBoxOptionToEngineName = (option: EuiComboBoxOptionOption<string>): string =>
  option.label;

export const MetaEngineCreation: React.FC = () => {
  const {
    configuredLimits: {
      engine: { maxEnginesPerMetaEngine } = { maxEnginesPerMetaEngine: Infinity },
    },
  } = useValues(AppLogic);

  const {
    fetchIndexedEngineNames,
    setRawName,
    setSelectedIndexedEngineNames,
    submitEngine,
  } = useActions(MetaEngineCreationLogic);

  const { rawName, name, indexedEngineNames, selectedIndexedEngineNames } = useValues(
    MetaEngineCreationLogic
  );

  useEffect(() => {
    fetchIndexedEngineNames();
  }, []);

  return (
    <div data-test-subj="MetaEngineCreation">
      <SetPageChrome trail={[META_ENGINE_CREATION_TITLE]} />
      <EuiPageHeader>
        <EuiPageHeaderSection>
          <EuiTitle size="l">
            <h1>{META_ENGINE_CREATION_TITLE}</h1>
          </EuiTitle>
          <EuiText>{META_ENGINE_CREATION_FORM_META_ENGINE_DESCRIPTION}</EuiText>
          <EuiText>{META_ENGINE_CREATION_FORM_DOCUMENTATION_DESCRIPTION}</EuiText>
        </EuiPageHeaderSection>
      </EuiPageHeader>
      <EuiPageBody>
        <FlashMessages />
        <EuiPanel>
          <EuiForm>
            <form
              data-test-subj="MetaEngineCreationForm"
              onSubmit={(e) => {
                e.preventDefault();
                submitEngine();
              }}
            >
              <EuiTitle>
                <EuiText>{META_ENGINE_CREATION_FORM_TITLE}</EuiText>
              </EuiTitle>
              <EuiSpacer />
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiFormRow
                    data-test-subj="MetaEngineCreationNameFormRow"
                    label={META_ENGINE_CREATION_FORM_ENGINE_NAME_LABEL}
                    helpText={
                      name.length > 0 && rawName !== name ? (
                        <>
                          {SANITIZED_NAME_NOTE} <strong>{name}</strong>
                        </>
                      ) : (
                        ALLOWED_CHARS_NOTE
                      )
                    }
                    fullWidth
                  >
                    <EuiFieldText
                      name="engine-name"
                      value={rawName}
                      onChange={(event) => setRawName(event.currentTarget.value)}
                      autoComplete="off"
                      fullWidth
                      data-test-subj="MetaEngineCreationNameInput"
                      placeholder={META_ENGINE_CREATION_FORM_ENGINE_NAME_PLACEHOLDER}
                      autoFocus
                    />
                  </EuiFormRow>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiSpacer />
              <EuiFormRow label={META_ENGINE_CREATION_FORM_ENGINE_SOURCE_ENGINES_LABEL} fullWidth>
                <EuiComboBox
                  data-test-subj="MetaEngineCreationSourceEnginesInput"
                  options={indexedEngineNames.map(engineNameToComboBoxOption)}
                  selectedOptions={selectedIndexedEngineNames.map(engineNameToComboBoxOption)}
                  onChange={(options) => {
                    setSelectedIndexedEngineNames(options.map(comboBoxOptionToEngineName));
                  }}
                />
              </EuiFormRow>
              <EuiSpacer />
              {selectedIndexedEngineNames.length > maxEnginesPerMetaEngine && (
                <EuiCallOut
                  color="warning"
                  title={META_ENGINE_CREATION_FORM_MAX_SOURCE_ENGINES_WARNING_TITLE}
                />
              )}
              <EuiSpacer />
              <EuiButton
                disabled={
                  name.length === 0 ||
                  selectedIndexedEngineNames.length === 0 ||
                  selectedIndexedEngineNames.length > maxEnginesPerMetaEngine
                }
                type="submit"
                data-test-subj="NewMetaEngineSubmitButton"
                fill
                color="secondary"
              >
                {META_ENGINE_CREATION_FORM_SUBMIT_BUTTON_LABEL}
              </EuiButton>
            </form>
          </EuiForm>
        </EuiPanel>
      </EuiPageBody>
    </div>
  );
};
