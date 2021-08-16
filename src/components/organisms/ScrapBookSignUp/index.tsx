import React, {
  FunctionComponent,
  PropsWithChildren,
  useRef,
  useState,
} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import {
  AmplifyButton,
  LinkCell,
  Header,
  FormField,
  Wrapper,
} from 'aws-amplify-react-native';
import {Auth, I18n} from 'aws-amplify';
import AmplifyTheme, {
  placeholderColor,
} from 'aws-amplify-react-native/src/AmplifyTheme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
import {SelectItem} from '../../../models';
import dateFormat from 'dateformat';

type SignupProps = {
  signUpConfig: {};
};

type SelectFieldProps = {
  onValueChange: (value: string) => void;
};

const DateField: FunctionComponent<SelectFieldProps> = (
  props: PropsWithChildren<any>,
) => {
  const theme = props.theme || AmplifyTheme;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [value, setValue] = useState<string | undefined>();

  return (
    <View style={theme.formField}>
      <Text style={theme.inputLabel}>
        {props.label} {props.required ? '*' : ''}
      </Text>
      <TextInput
        style={theme.input}
        autoCapitalize="none"
        editable={false}
        value={value}
        autoCorrect={false}
        placeholderTextColor={placeholderColor}
        onTouchEnd={() => {
          setShowModal(!showModal);
        }}
        {...props}
      />
      <DateTimePickerModal
        isVisible={showModal}
        onChange={() => {}}
        date={new Date()}
        onCancel={() => {
          setShowModal(false);
        }}
        onConfirm={val => {
          setValue(dateFormat(val, 'dd-mm-yyyy'));
          setShowModal(false);
          props.onValueChange(dateFormat(val, 'dd-mm-yyyy'));
        }}
        mode={'date'}
      />
    </View>
  );
};

const InputSelect: FunctionComponent<SelectFieldProps> = (
  props: PropsWithChildren<any>,
) => {
  const theme = props.theme || AmplifyTheme;
  const [value, setValue] = useState<SelectItem | undefined>();
  const ref = useRef();
  const items = [
    {label: 'Male', value: 'M'},
    {label: 'Female', value: 'F'},
  ];

  return (
    <View style={theme.formField}>
      <Text style={theme.inputLabel}>
        {props.label} {props.required ? '*' : ''}
      </Text>
      <TextInput
        style={theme.input}
        autoCapitalize="none"
        editable={false}
        value={value?.label}
        onPressIn={() => {
          ref?.current?.togglePicker();
        }}
        autoCorrect={false}
        placeholderTextColor={placeholderColor}
        {...props}
      />
      <RNPickerSelect
        ref={ref}
        value=""
        style={{viewContainer: {height: 0}}}
        onValueChange={val => {
          if (val) {
            const res = items.find(i => i.value === val);
            if (res) {
              setValue(res);
            }
          }
        }}
        onDonePress={() => {
          props.onValueChange(value?.value);
        }}
        items={items}
      />
    </View>
  );
};

type Form = {
  email?: string;
  password?: string;
  name?: string;
  birthdate?: string;
  gender?: string;
};

export const ScrapBookSignUp: FunctionComponent<SignupProps> = (
  props: PropsWithChildren<any>,
) => {
  const [form, setForm] = useState<Form>({});

  async function signUp() {
    try {
      await Auth.signUp({
        username: form.email,
        password: form.password,
        attributes: {
          email: form.email,
          gender: form.gender,
          birthdate: form.birthdate,
          name: form.name,
        },
      });
      props.onStateChange('confirmSignUp');
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  if (props.authState === 'signUp') {
    return (
      <Wrapper>
        <ScrollView
          style={props.theme.sectionScroll}
          keyboardShouldPersistTaps="handled">
          <Header>Sign up</Header>
          <View style={props.theme.sectionBody}>
            {props.signUpConfig.signUpFields.map(field => {
              switch (field.type) {
                case 'date':
                  return (
                    <DateField
                      {...props}
                      {...field}
                      onValueChange={val =>
                        setForm({...form, [field.key]: val})
                      }
                    />
                  );
                case 'gender':
                  return (
                    <InputSelect
                      {...props}
                      {...field}
                      onValueChange={value =>
                        setForm({...form, [field.key]: value})
                      }
                    />
                  );
                default:
                  return (
                    <FormField
                      key={field.key}
                      theme={props.theme}
                      // @ts-ignore
                      type={field.type}
                      secureTextEntry={field.type === 'password'}
                      onChangeText={text => {
                        setForm({...form, [field.key]: text});
                      }}
                      label={field.label}
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  );
              }
            })}
            <AmplifyButton
              text={I18n.get('Sign Up').toUpperCase()}
              theme={props.theme}
              onPress={() => {
                signUp();
              }}
              disabled={false}
            />
          </View>
          <View style={props.theme.sectionFooter}>
            <LinkCell
              theme={props.theme}
              onPress={() => props.onStateChange('confirmSignUp')}>
              {I18n.get('Confirm a Code')}
            </LinkCell>
            <LinkCell
              theme={props.theme}
              onPress={() => props.onStateChange('signIn')}>
              {I18n.get('Sign In')}
            </LinkCell>
          </View>
        </ScrollView>
      </Wrapper>
    );
  }
  return null;
};
