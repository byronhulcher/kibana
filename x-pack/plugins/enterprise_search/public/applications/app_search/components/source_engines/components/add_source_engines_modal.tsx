/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';

import { useActions } from 'kea';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiModalFooter,
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiOverlayMask,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';

import { i18n } from '@kbn/i18n';

import { SourceEnginesLogic } from '../source_engines_logic';

export const AddSourceEnginesModal: React.FC = () => {
  const { closeAddSourceEnginesModal } = useActions(SourceEnginesLogic);

  const MODAL_TITLE = i18n.translate(
    'xpack.enterpriseSearch.appSearch.engine.souceEngines.addSourceEnginesModal.title',
    {
      defaultMessage: 'Add Engines',
    }
  );

  const MODAL_DESCRIPTION = i18n.translate(
    'xpack.enterpriseSearch.appSearch.engine.souceEngines.addSourceEnginesModal.description',
    {
      defaultMessage: 'Add additional Engines to this Meta Engine',
    }
  );

  return (
    <EuiOverlayMask>
      <EuiModal onClose={closeAddSourceEnginesModal}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>{MODAL_TITLE}</EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
          <EuiText>{MODAL_DESCRIPTION}</EuiText>
          <EuiSpacer />
          {/* <EuiComboBox
            options={selectableEngineNames.map((engineName) => ({ label: engineName }))}
            selectedOptions={selectedEngineNamesToAdd.map((engineName) => ({ label: engineName }))}
            onChange={(options) =>
              setSelectedEngineNamesToAdd(options.map((option) => option.label))
            }
          /> */}
        </EuiModalBody>
        <EuiModalFooter>
          <EuiButtonEmpty onClick={closeAddSourceEnginesModal}>Cancel</EuiButtonEmpty>
          <EuiButton
            // disabled={selectedEngineNamesToAdd.length === 0}
            // onClick={() => addSourceEngines(selectedEngineNamesToAdd)}
            fill
          >
            Save
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    </EuiOverlayMask>
  );
};
