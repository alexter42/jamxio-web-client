import React from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { Form, FormBox, Label, FieldBox, Button, ModalButtonBox, ItemBox } from './style';
import 'react-widgets/dist/css/react-widgets.css';
// FIXME refactor this

const Input = ({ input, data, valueField, textField }) => (
  <input
    {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []} // requires value to be an array
    data={data}
    valueField={valueField}
    textField={textField}
  />
);

Input.propTypes = {
  input: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  valueField: PropTypes.object.isRequired,
  textField: PropTypes.object.isRequired,
  onChange: PropTypes.object.isRequired
};

const RF = props => {
  const { handleSubmit } = props;
  return (
    <Form>
      <form onSubmit={handleSubmit}>
        <FormBox>
          <ItemBox>
            <Label>Nombre:</Label>
            <FieldBox>
              <Field name="name" component={Input} />
            </FieldBox>
          </ItemBox>
          <ItemBox>
            <Label>e-mail:</Label>
            <FieldBox>
              <Field name="e-mail" component={Input} />
            </FieldBox>
          </ItemBox>
          <ItemBox>
            <Label>Institucion:</Label>
            <FieldBox>
              <Field name="institution" component={Input} />
            </FieldBox>
          </ItemBox>
          <ItemBox>
            <Label>Tipo de Institucion:</Label>
            <FieldBox>
              <Field name="institution_type" component={Input} />
            </FieldBox>
          </ItemBox>
        </FormBox>
        <FormBox>
          <ItemBox>
            <Label>Usuario:</Label>
            <FieldBox>
              <Field name="username" component={Input} />
            </FieldBox>
          </ItemBox>
          <ItemBox>
            <Label>Contrasena:</Label>
            <FieldBox>
              <Field name="password" component={Input} />
            </FieldBox>
          </ItemBox>
        </FormBox>
        <ModalButtonBox>
          <Button onClick={props.handleHide}>Registrar</Button>
        </ModalButtonBox>
      </form>
    </Form>
  );
};

RF.propTypes = {
  handleHide: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

const RegisterForm = reduxForm({
  form: 'registerForm' // a unique identifier for this form
})(RF);

export default RegisterForm;