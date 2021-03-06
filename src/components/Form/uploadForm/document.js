import React from 'react';
import 'react-widgets/dist/css/react-widgets.css';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form/immutable';
import DropdownList from 'react-widgets/lib/DropdownList';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import PropTypes from 'prop-types';

import * as alertActions from 'Store/reducers/alert/alertActions';
import * as dropzoneActions from 'Store/reducers/dropzone/dropzoneActions';
import * as validateActions from 'Store/reducers/form/validateFileForm/validateActions';
import { getDropzone, getAlert } from 'Utils/selectors/common';
import {
  Button,
  ModalButtonBox,
  AlertBox,
  Form,
  FormBox,
  Title,
  Alert,
  FieldBox,
  DropzoneBox
} from './style';
import Dropzone from '../../Dropzone';
import AlertText from '../../Alert';

import { validate, createDocument } from './validate';

// Actions

// Selectors

const reduxActions = [alertActions, dropzoneActions, validateActions];

function mapStateToProps(state) {
  return {
    dropzone: getDropzone(state),
    alertState: getAlert(state)
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...reduxActions)
    .filter(value => typeof value === 'function')
    .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

const sources = [
  'SENER',
  'SEGOB',
  'IMMEX',
  'SE',
  'Cartocritica',
  'EIMM',
  'SE',
  'GeoComunes',
  'CONABIO',
  'CONANP',
  'datamxio',
  'RAN',
  'SINAICA',
  'SINEA',
  'CONAPRED',
  'INECC',
  'CONAPO',
  'CDI',
  'COFEPRIS',
  'SEMARNAT',
  'INEGI',
  'otra'
];

const renderDropdownList = ({ input, data, valueField, textField }) => (
  <DropdownList
    {...input}
    data={data}
    valueField={valueField}
    textField={textField}
    onChange={input.onChange}
  />
);

renderDropdownList.propTypes = {
  input: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  valueField: PropTypes.object.isRequired,
  textField: PropTypes.object.isRequired,
  onChange: PropTypes.object.isRequired
};

const dropzone = ({ input, data, valueField, textField, actions, change }) => (
  <Dropzone
    {...input}
    data={data}
    valueField={valueField}
    textField={textField}
    onChange={input.onChange}
    actions={actions}
    change={change}
  />
);

dropzone.propTypes = {
  input: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  change: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  valueField: PropTypes.object.isRequired,
  textField: PropTypes.object.isRequired,
  onChange: PropTypes.object.isRequired
};

const handleRecord = async (props, document) => {
  await props.handleAddRecord(document);
};

const UF = props => {
  const handleSubmit = () => {
    const formData = props.forms.uploadForm;
    const document = createDocument(formData, props.record).then(data => {
      handleRecord(props, data);
      props.handleHide();
    });
    return document;
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormBox>
        <Title big>Categoria:</Title>
        <Title big>{props.record.documentType.category}</Title>
      </FormBox>
      <FormBox>
        <Title>Subcategoria:</Title>
        <Title big>{props.record.documentType.subcategory}</Title>
      </FormBox>
      <FormBox>
        <Title>Titulo:</Title>
        <Title big>{props.record.title}</Title>
      </FormBox>
      <FormBox>
        <Title>Fuente de los datos:</Title>
        <FieldBox>
          <Field
            name="source"
            component={renderDropdownList}
            data={sources}
            valueField="value"
            textField="source"
          />
        </FieldBox>
      </FormBox>
      <AlertBox>
        <a href="http://geojson.org/" target="_blank" without rel="noopener noreferrer">
          <Alert blue>
            Antes de contribuir datos por favor asegurate que el esquema de datos esta en la
            estructura requerida por el sistema
          </Alert>
        </a>
        <AlertText {...props} />
      </AlertBox>
      <DropzoneBox>
        <Field
          name="file"
          component={dropzone}
          data={sources}
          valueField="value"
          textField="file"
          actions={props.actions}
          change={props.change}
        />
      </DropzoneBox>
      <ModalButtonBox>
        <Button cancel="true" onClick={props.handleHide}>
          Salir
        </Button>
        <Button onClick={handleSubmit} disabled={!props.valid}>
          Subir
        </Button>
      </ModalButtonBox>
    </Form>
  );
};

UF.propTypes = {
  record: PropTypes.object.isRequired,
  forms: PropTypes.object.isRequired,
  valid: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired,
  change: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

const UFD = reduxForm({
  form: 'uploadForm',
  validate
})(UF);

const UploadForm = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UFD);

export default UploadForm;
