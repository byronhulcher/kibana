/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { generatePath } from 'react-router-dom';

import { CREATE_ENGINE_SUCCESS_MESSAGE } from './constants';
import {
  LogicMounter,
  mockHttpValues,
  mockKibanaValues,
  mockFlashMessageHelpers,
} from '../../../__mocks__';
import { ENGINE_PATH } from '../../routes';
import { formatApiName } from '../../utils/format_api_name';
import { CreateEngineLogic, DEFAULT_LANGUAGE } from './create_engine_logic';

describe('CreateEngineLogic', () => {
  const { mount } = new LogicMounter(CreateEngineLogic);
  const { http } = mockHttpValues;
  const { navigateToUrl } = mockKibanaValues;
  const { setQueuedSuccessMessage, flashAPIErrors } = mockFlashMessageHelpers;

  const DEFAULT_VALUES = {
    name: '',
    rawName: '',
    language: DEFAULT_LANGUAGE,
  };

  it('has expected default values', () => {
    mount();
    expect(CreateEngineLogic.values).toEqual(DEFAULT_VALUES);
  });

  describe('actions', () => {
    describe('onCreateEngineSuccess', () => {
      beforeAll(() => {
        mount();
        // setup local state
        CreateEngineLogic.actions.setLanguage('English');
        CreateEngineLogic.actions.setRawName('test');
        // call action
        CreateEngineLogic.actions.onCreateEngineSuccess();
      });

      it('should set a success message', () => {
        expect(setQueuedSuccessMessage).toHaveBeenCalledWith(CREATE_ENGINE_SUCCESS_MESSAGE);
      });

      it('should navigate the user to the engine page', () => {
        const enginePath = generatePath(ENGINE_PATH, { engineName: CreateEngineLogic.values.name });
        expect(navigateToUrl).toHaveBeenCalledWith(enginePath);
      });
    });

    describe('setLanguage', () => {
      const newLanguage = 'English';

      beforeAll(() => {
        mount();
        CreateEngineLogic.actions.setLanguage(newLanguage);
      });

      describe('language', () => {
        it('should be set to provided value', () => {
          expect(CreateEngineLogic.values.language).toEqual(newLanguage);
        });
      });
    });

    describe('setRawName', () => {
      const newName = 'Name__With#$&*%Special--Characters';
      const sanitizedNewName = formatApiName(newName);

      beforeAll(() => {
        mount();
        CreateEngineLogic.actions.setRawName(newName);
      });

      describe('rawName', () => {
        it('should be set to provided value', () => {
          expect(CreateEngineLogic.values.rawName).toEqual(newName);
        });
      });

      describe('name', () => {
        it('should be set to a sanitized value', () => {
          expect(CreateEngineLogic.values.name).toEqual(sanitizedNewName);
        });
      });
    });

    describe('submitEngine', () => {
      beforeAll(() => {
        mount();
        // setup local state
        CreateEngineLogic.actions.setLanguage('English');
        CreateEngineLogic.actions.setRawName('test');
      });

      it('POSTS to /api/app_search/engines', () => {
        const body = JSON.stringify({
          name: CreateEngineLogic.values.name,
          language: CreateEngineLogic.values.language,
        });
        CreateEngineLogic.actions.submitEngine();
        expect(http.post).toHaveBeenCalledWith('/api/app_search/engines', { body });
      });

      it('calls onCreateEngineSuccess on valid submission', async () => {
        jest.spyOn(CreateEngineLogic.actions, 'onCreateEngineSuccess'); // .mockImplementation();
        const promise = (http.post as jest.Mock).mockReturnValueOnce({});
        await CreateEngineLogic.actions.submitEngine();
        await promise;
        expect(CreateEngineLogic.actions.onCreateEngineSuccess).toHaveBeenCalledTimes(1);
      });

      it('calls flashAPIErrors on API Error', async () => {
        const promise = (http.post as jest.Mock).mockReturnValueOnce(
          Promise.reject({
            body: {
              statusCode: 400,
              error: 'Bad Request',
              message: 'Invalid request payload JSON format',
            },
          })
        );
        await CreateEngineLogic.actions.submitEngine();
        await promise;
        expect(flashAPIErrors).toHaveBeenCalledTimes(1);
      });
    });
  });
});
