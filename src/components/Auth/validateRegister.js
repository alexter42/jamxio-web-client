import React from 'react';
import PropTypes from 'prop-types';

/* show, handleHide, message, title */
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import { ValidateRegisterForm } from 'Components/Form';
import { ModalOuter, ModalBox, ModalHeader, Title } from './style';
// Actions
import * as alertActions from '../../store/reducers/alert/alertActions';
import * as authActions from '../../store/reducers/app/forms/auth/authActions';

// Selectors
import { getAlert } from '../../utils/selectors/common';

const actions = [alertActions, authActions];

function mapStateToProps(state) {
  return {
    alertState: getAlert(state)
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

const ValidateRegisterModal = props => (
  <div id="outer-container">
    <main id="page-wrap">
      <ModalOuter>
        <ModalBox>
          <ModalHeader>
            <Title>Validar Correo</Title>
          </ModalHeader>
          <ValidateRegisterForm {...props} />
        </ModalBox>
      </ModalOuter>
    </main>
  </div>
);

ValidateRegisterModal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  handleHide: PropTypes.func.isRequired
};

const LM = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ValidateRegisterModal);

export default LM;
