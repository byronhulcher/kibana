/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Request } from '../../../../../common/adapters/request/types';
import { RequestDetailsProps } from '../types';
import { RequestCodeViewer } from './req_code_viewer';

export class RequestDetailsResponse extends Component<RequestDetailsProps> {
  static propTypes = {
    request: PropTypes.object.isRequired,
  };

  static shouldShow = (request: Request) =>
    Boolean(RequestDetailsResponse.getResponseJson(request));

  static getResponseJson = (request: Request) => (request.response ? request.response.json : null);

  render() {
    const responseJSON = RequestDetailsResponse.getResponseJson(this.props.request);

    if (!responseJSON) {
      return null;
    }

    return <RequestCodeViewer json={JSON.stringify(responseJSON, null, 2)} />;
  }
}
