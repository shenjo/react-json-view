import React from 'react';
import dispatcher from './../../helpers/dispatcher';

import { CheckCircle, Add as Cancel } from './../icons';

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
    keyModalStyle.style.boxShadow = 'rgba(0,0,0,0.1) 0px 0px 10px';
    
    const keyModalLabel = { ...Theme(theme, 'key-modal-label') };
    keyModalLabel.style.color = '#000';
    
    const inputStyle = { ...Theme(theme, 'key-modal-input') };
    inputStyle.style.border = undefined;
    
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
          <div {...keyModalLabel}>JSON key值</div>
          <div style={{ position: 'relative' }}>
            <input className={Styles['key-model-label']}
                   ref={el => el && el.focus()}
                   spellCheck={false}
                   value={input}
                   placeholder="请输入JSON key..."
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
              ? <CheckCircle {...Theme(theme, 'key-modal-submit')}
                             class="key-modal-submit"
                             onClick={e => this.submit()}
              />
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
