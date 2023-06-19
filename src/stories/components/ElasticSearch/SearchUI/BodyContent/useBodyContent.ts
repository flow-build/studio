/* eslint-disable @typescript-eslint/no-explicit-any */

import type { SearchResult } from '@elastic/search-ui';
import _isObject from 'lodash/isObject';
import Mustache from 'mustache';
import { Logger } from 'utils';

import { FieldsItemResult } from '../types';
import { DynamicObject } from './types';

export const useBodyContent = (fields?: FieldsItemResult[]) => {
  function transformArrayToNestedObject(daynamicObjects: DynamicObject[]): Record<string, any> {
    const nestedObject: Record<string, any> = {};

    daynamicObjects.forEach((item) => {
      const { name, value, isPropArrayComponent } = item;
      const parts = name.split('.');
      let currentObject: Record<string, any> = nestedObject;

      parts.forEach((part, index) => {
        if (!currentObject[part]) {
          currentObject[part] = isPropArrayComponent ? [] : {};
        }

        if (index === parts.length - 1) {
          if (isPropArrayComponent) {
            currentObject[part].push(value);
          } else {
            currentObject[part] = value;
          }
        }

        currentObject = currentObject[part];
      });
    });

    const newObject = createObject(nestedObject);

    return { ...nestedObject, ...newObject };
  }

  function createObject(nestedObject: Record<string, any>) {
    return Object.keys(nestedObject).reduce((prev, current) => {
      if (Array.isArray(nestedObject[current])) {
        const mapObject = nestedObject[current].map((arrItem: any) => {
          const result: Record<string, any> = {};
          result[current] = arrItem;
          return result;
        });

        return { ...prev, [current]: mapObject };
      }

      return prev;
    }, {});
  }

  function getValueElastic(field: FieldsItemResult, searchResult: SearchResult) {
    try {
      const propsObjectElastic = field.namePropElasticSearch.split('.');
      const isPropsObjectElastic = propsObjectElastic.length > 1;

      if (isPropsObjectElastic) {
        const objElastic = JSON.parse(searchResult[propsObjectElastic[0]]?.raw);

        if (_isObject(objElastic)) {
          const result = propsObjectElastic.reduce((acc: any, curr: any) => {
            if (acc[curr]) {
              return acc[curr];
            }
            return acc;
          }, objElastic);

          return result;
        }
      }

      return searchResult[field.namePropElasticSearch]?.raw ?? '';
    } catch (error) {
      Logger.error({ error });
      return searchResult[field.namePropElasticSearch]?.raw ?? '';
    }
  }

  function getValue(field: FieldsItemResult, searchResult: SearchResult) {
    const valueProp = getValueElastic(field, searchResult);
    if (field.customValue) {
      const objReplace = {
        [field.namePropElasticSearch]: field.namePropElasticSearch ? valueProp ?? '' : ''
      };

      return Mustache.render(field.customValue, objReplace);
    }

    return valueProp;
  }

  function buildProp(field: FieldsItemResult, searchResult: SearchResult) {
    return {
      [field.namePropComponent]: getValue(field, searchResult)
    };
  }

  function getPropsCard<T>(result: SearchResult): T | null {
    let objects: Array<DynamicObject> = [];

    if (!fields) return null;

    let propsCard = fields.reduce((prev, current) => {
      const propsObj = current.namePropComponent.split('.');
      const isObject = propsObj.length > 1;

      if (isObject) {
        objects = [
          ...objects,
          {
            name: current.namePropComponent,
            value: getValue(current, result),
            isPropArrayComponent: current.isPropArrayComponent
          }
        ];

        return prev;
      } else {
        const valueProp = buildProp(current, result);

        return {
          ...prev,
          ...valueProp
        };
      }
    }, {});

    if (objects.length) {
      const complexObj = transformArrayToNestedObject(objects);
      propsCard = {
        ...propsCard,
        ...complexObj
      };
    }

    return propsCard as T;
  }

  return {
    getPropsCard
  };
};
