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

import { CoreSetup, CoreStart, Plugin, PluginInitializerContext } from 'kibana/public';
import { CorePluginAPluginSetup } from '../../core_plugin_a/public/plugin';

declare global {
  interface Window {
    env?: PluginInitializerContext['env'];
  }
}

export interface CorePluginBDeps {
  core_plugin_a: CorePluginAPluginSetup;
}

export class CorePluginBPlugin
  implements Plugin<CorePluginBPluginSetup, CorePluginBPluginStart, CorePluginBDeps> {
  constructor(pluginContext: PluginInitializerContext) {
    window.env = pluginContext.env;
  }
  public setup(core: CoreSetup, deps: CorePluginBDeps) {
    core.application.register({
      id: 'bar',
      title: 'Bar',
      async mount(params) {
        const { renderApp } = await import('./application');
        const [coreStart] = await core.getStartServices();
        return renderApp(coreStart, params);
      },
    });

    return {
      sayHi() {
        return `Plugin A said: ${deps.core_plugin_a.getGreeting()}`;
      },
    };
  }

  public async start(core: CoreStart, deps: {}) {
    return {
      sendSystemRequest: async (asSystemRequest: boolean) => {
        const response = await core.http.post<string>('/core_plugin_b/system_request', {
          asSystemRequest,
        });
        return `/core_plugin_b/system_request says: "${response}"`;
      },
    };
  }

  public stop() {}
}

export type CorePluginBPluginSetup = ReturnType<CorePluginBPlugin['setup']>;
export type CorePluginBPluginStart = ReturnType<CorePluginBPlugin['start']>;
