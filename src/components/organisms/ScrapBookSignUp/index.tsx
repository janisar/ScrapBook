import React, {
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
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
import {ProfileContext} from '../../../context/UserContext';
import {useTranslation} from 'react-i18next';

type SignupProps = {
  signUpConfig: {};
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
  const {setLoggedIn, setProfile} = useContext(ProfileContext);
  const {t: values} = useTranslation('values');
  const {t: registerT} = useTranslation('register');

  useEffect(() => {
    if (props.authState === 'signedUp') {
      setLoggedIn(true);
      setProfile({});
    }
  }, [props.authState]);

  const [form, setForm] = useState<Form>({});
  const [error, setError] = useState<string | undefined>(undefined);

  function validateForm(currentForm: Form): boolean {
    if (currentForm.password && currentForm.email) {
      return true;
    } else {
      setError(registerT('registerError'));
      return false;
    }
  }

  async function signUp() {
    try {
      if (validateForm(form)) {
        await Auth.signUp({
          username: form.email!,
          password: form.password!,
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
      setError(registerT('registerCommonErr'));
    }
  }

  if (props.authState === 'signUp') {
    return (
      <Wrapper>
        <ScrollView
          style={props.theme.sectionScroll}
          keyboardShouldPersistTaps="handled">
          <Header>{registerT('header')}</Header>
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
                      items={values('gender', {returnObjects: true})}
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
