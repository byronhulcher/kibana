/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { flatten } from 'lodash';

import { SchemaConflictFieldTypes, SchemaConflicts } from '../../../shared/types';
import { EngineDetails } from '../engine/types';

const getConflictingEnginesFromConflictingField = (
  conflictingField: SchemaConflictFieldTypes
): string[] => flatten(Object.values(conflictingField));

const getConflictingEnginesFromSchemaConflicts = (schemaConflicts: SchemaConflicts): string[] =>
  flatten(Object.values(schemaConflicts).map(getConflictingEnginesFromConflictingField));

// Given a meta-engine (represented by IEngineDetails), generate a Set of all source engines
// who have schema conflicts in the context of that meta-engine
//
// A Set allows us to enforce uniqueness and has O(1) lookup time
export const getConflictingEnginesSet = (metaEngine: EngineDetails): Set<string> => {
  const conflictingEngines: string[] = metaEngine.schemaConflicts
    ? getConflictingEnginesFromSchemaConflicts(metaEngine.schemaConflicts)
    : [];
  return new Set(conflictingEngines);
};
