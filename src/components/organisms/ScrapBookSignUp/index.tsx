import React, {FunctionComponent, PropsWithChildren, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {
  AmplifyButton,
  LinkCell,
  Header,
  FormField,
  Wrapper,
} from 'aws-amplify-react-native';
import {Auth, I18n} from 'aws-amplify';
import {InputSelect} from '../../molecules/InputSelect';
import {InputDateField} from '../../molecules/InputDateField';
import {Text} from '../../atoms/Text';

type SignupProps = {
  signUpConfig: {};
};

export const items = [
  {label: 'Male', value: 'M'},
  {label: 'Female', value: 'F'},
  {label: 'Other', value: 'O'},
  {label: 'Prefer not to say', value: '0'},
];

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
  const [error, setError] = useState<string | undefined>(undefined);

  function validateForm(currentForm: Form): boolean {
    if (currentForm.password && currentForm.email) {
      return true;
    } else {
      setError('Please fill all the required fields!');
      return false;
    }
  }

  async function signUp() {
    try {
      if (validateForm(form)) {
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
      }
    } catch (e) {
      setError('Something went wrong, please check the fields and try again!');
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
                    <InputDateField
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
                      items={items}
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
            {error && (
              <View style={{marginBottom: 20}}>
                <Text extendedStyle={{color: 'red'}}>{error}</Text>
              </View>
            )}
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
