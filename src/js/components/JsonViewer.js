import React from 'react';
import JsonObject from './DataTypes/Object';
import ArrayGroup from './ArrayGroup';
import Styles from '../../style/less/global.less';

export default class extends React.PureComponent {
  render = () => {
    const { props } = this;
    const namespace = [props.name];
    let ObjectComponent = JsonObject;
    
    if (props.groupArraysAfterLength && props.src.length > props.groupArraysAfterLength) {
      ObjectComponent = ArrayGroup;
    }
    
    return (
      <div class="pretty-json-container object-container">
        <div className={Styles['object-content']}>
          <ObjectComponent
            namespace={namespace}
            depth={0}
            jsvRoot={true}
            {...props} />
        </div>
      </div>
    );
  };
}
