import React from 'react';
import PropTypes from 'prop-types';

/* show, handleHide, message, title */
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import { ValidateRegisterForm } from 'Components/Form';
// Actions
import * as alertActions from 'Store/reducers/alert/alertActions';
import * as authActions from 'Store/reducers/app/forms/auth/authActions';

// Selectors
import { getAlert, getAuthForm } from 'Utils/selectors/common';
import { ModalOuter, ModalBox, ModalHeader, Title } from './style';

const actions = [alertActions, authActions];

function mapStateToProps(state) {
  return {
    alertState: getAlert(state),
    formState: getAuthForm(state)
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
