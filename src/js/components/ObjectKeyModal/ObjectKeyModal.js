import React from 'react';
import dispatcher from './../../helpers/dispatcher';

import { CheckCircle, Add as Cancel, getIconStyle } from './../icons';

//global theme
import Theme from './../../themes/getStyle';
import Styles from './../../../style/less/global.less';
import deleteBtn from '../../../images/delete.svg';

//this input appears when adding a new value to an object
export default class extends React.PureComponent {
  constructor (props) {
    super(props);
    this.state = {
      input: props.input ? props.input : ''
    };
  }
  
  render () {
    const { theme, rjvId, isValid } = this.props;
    const { input } = this.state;
    
    const valid = isValid(input);
    const keyModalStyle = { ...Theme(theme, 'key-modal') };
    keyModalStyle.style.background = '#fff';
    keyModalStyle.style.padding = '16px';
    keyModalStyle.style.width = '240px';
    keyModalStyle.style.lineHeight = '20px';
    keyModalStyle.style.boxShadow = 'rgba(153, 153, 153, 0.5) 0px 2px 6px';
    
    const keyModalLabel = { ...Theme(theme, 'key-modal-label') };
    keyModalLabel.style.color = '#000';
    keyModalLabel.style.marginBottom = '8px';
    keyModalLabel.style.fontSize = '14px';
    
    const inputStyle = { ...Theme(theme, 'key-modal-input') };
    inputStyle.style.border = undefined;
    
    const checkIconStyle ={...Theme(theme, 'key-modal-submit')}
    delete checkIconStyle.style.position
    
    return (
      <div
        className={Styles['key-mode-request']}
        {...Theme(theme, 'key-modal-request')}
        onClick={this.closeModal}
      >
        <div
          {...keyModalStyle}
          onClick={(e) => {e.stopPropagation();}}
        >
          <div {...keyModalLabel}>新增key</div>
          <div style={{ position: 'relative' }}>
            <input className={Styles['key-model-label']}
                   ref={el => el && el.focus()}
                   spellCheck={false}
                   value={input}
                   placeholder="请输入key..."
                   onChange={(e) => {
                     this.setState({
                       input: e.target.value
                     });
                   }}
                   onKeyPress={(e) => {
                     if (valid && e.key === 'Enter') {
                       this.submit();
                     } else if (e.key === 'Escape') {
                       this.closeModal();
                     }
                   }}
            />
            {valid
              ?
              (<div className={Styles['submit-add-key']} onClick={e => this.submit()}>
                <CheckCircle {...checkIconStyle}
                             class="key-modal-submit"/>
              </div>)
              : null}
          </div>
          <span className={Styles['key-modal-cancel']} onClick={()=>{
            dispatcher.dispatch({
              rjvId: rjvId,
              name: 'RESET'
            });
          }}>
            <img src={deleteBtn} className={Styles['delete-svg']} alt=""/>
          </span>
        </div>
      </div>
    );
  }
  
  closeModal = () => {
    dispatcher.dispatch({
      rjvId: this.props.rjvId,
      name: 'RESET'
    });
  };
  
  submit = () => {
    this.props.submit(this.state.input);
  };
}
