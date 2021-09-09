import { each, isString, noop } from 'lodash';
import capitalizeFirst from './capitalizeFirst';
import { FragmentData, FragmentDataMapping, MergedJsonRepresentation, MergedJsonRepresentationMap } from './types';

type NonReferenceFieldHandler = (fieldName: string, fieldType: string) => void;
type ReferenceFieldHandler = (fieldName: string, data: MergedJsonRepresentationMap) => void;

const constructPath = (path: string, fieldname: string, contentType: string) => {
  return `${path}_${fieldname}_${capitalizeFirst(contentType)}`;
};
export default class Node {
  static: boolean = false;
  numChildrenVisited: number = 0;
  data: MergedJsonRepresentation;
  contentType: string;
  path: string;
  parent?: Node;
  staticTypes: string[] = [];

  constructor(
    data: MergedJsonRepresentation,
    contentType: string,
    staticTypes: string[],
    parent?: Node,
    fieldName?: string
  ) {
    this.parent = parent;
    this.contentType = contentType;
    this.data = data;
    this.staticTypes = staticTypes;

    if (this.parent && !fieldName) {
      throw Error('fieldName must be provided when creating a child node');
    }

    if (this.staticTypes.includes(this.contentType)) {
      this.static = true;
    }

    this.path = !!this.parent
      ? constructPath(parent?.path as string, fieldName as string, this.contentType)
      : capitalizeFirst(this.contentType);
  }

  traverseJson(handleRef: ReferenceFieldHandler, handleNonRef: NonReferenceFieldHandler) {
    try {
      each(this.data, (fieldRepresentation, fieldName) => {
        if (isString(fieldRepresentation)) {
          handleNonRef(fieldRepresentation, fieldName);
        } else {
          handleRef(fieldName, fieldRepresentation);
        }
      });
    } catch (err) {
      console.error('Error traversing JSON', err.message, this);
    }
  }

  get children(): Node[] {
    const children: Node[] = [];
    try {
      const parentNode = this;

      this.traverseJson((fieldName, fieldData) => {
        each(fieldData, (fieldValue, contentType) => {
          children.push(new Node(fieldValue, contentType, this.staticTypes, parentNode, fieldName));
        });
      }, noop);
    } catch (e) {
      console.error(e);
    }
    return children;
  }

  updateFields(fragment: FragmentData): void {
    fragment.simpleValueFields = fragment.simpleValueFields || new Set<string>();
    fragment.referenceFields = fragment.referenceFields || {};

    const node = this;
    this.traverseJson(
      (fieldName, fieldData) => {
        if (!fragment.referenceFields[fieldName]) fragment.referenceFields[fieldName] = new Set<string>();
        each(fieldData, (_fieldValue, contentType) => {
          if (node.staticTypes.includes(contentType)) {
            fragment.referenceFields[fieldName]?.add(`${capitalizeFirst(contentType)}Fragment`);
          } else {
            fragment.referenceFields[fieldName]?.add(`${constructPath(node.path, fieldName, contentType)}Fragment`);
          }
        });
      },
      (fieldType, fieldName) => {
        switch (fieldType) {
          case 'RichText':
          case 'Array_RichText':
            fragment.richTextFields.add(fieldName);
            break;
          case 'Link_Asset':
          case 'Array_Link_Asset':
            fragment.assetFields.add(fieldName);
            break;
          case 'Location':
            fragment.locationFields.add(fieldName);
            break;
          default:
            fragment.simpleValueFields.add(fieldName);
            break;
        }
      }
    );
  }

  parseAndUpdateFragmentData = (fragmentMapping: FragmentDataMapping) => {
    if (!fragmentMapping[this.getFragmentName()]) {
      fragmentMapping[this.getFragmentName()] = {
        root: !this.parent || this.static,
        static: this.static,
        contentType: this.contentType,
        simpleValueFields: new Set<string>(),
        richTextFields: new Set<string>(),
        assetFields: new Set<string>(),
        locationFields: new Set<string>(),
        referenceFields: {}
      };
    }

    this.updateFields(fragmentMapping[this.getFragmentName()]);
    this.parent && this.parent.numChildrenVisited++;
  };

  getFragmentName(): string {
    return `${this.static ? capitalizeFirst(this.contentType) : this.path}Fragment`;
  }
}
