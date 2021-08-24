import React, {FunctionComponent, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Header2} from '../../../components/atoms/Header2';
import {DateSelect} from '../../../components/atoms/Date';
import {CheckboxComponent} from '../../../components/atoms/Checkbox';
import {useTranslation} from 'react-i18next';
import {ScrollView} from '../../../components/atoms/ScrollView';
import {HistoryPage} from '../../../i18n/models';
import {useScrollView} from '../../../hooks/useScrollView';
import {ScrollViewPage} from '../../../components/molecules/ScrollViewPage';
import Button from '../../../components/molecules/Button';
import {useNavigation} from '@react-navigation/native';
import {PartnerForm} from '../../../models/partner';
// @ts-ignore
import {AmplifyTheme} from 'aws-amplify-react-native';
import {InputSelect} from '../../../components/molecules/InputSelect';
import {FormInput} from '../../../components/molecules/FormInput';
import {useCountries} from '../../../hooks/useCountries';

type Props = {
  setFormValue: (field: string) => (value: string | Date | boolean) => void;
  save: () => void;
  form: PartnerForm;
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
  },
  wrapper: {
    paddingVertical: 80,
    display: 'flex',
    flex: 1,
  },
  headerStyle: {
    paddingBottom: 30,
  },
  header: {
    display: 'flex',
    flex: 2,
  },
  col: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  colItem: {
    flex: 1,
    alignItems: 'flex-end',
  },
  colItem2: {
    flex: 1,
    alignItems: 'center',
  },
  type: {
    justifyContent: 'center',
    width: '50%',
  },
  safeArea: {
    paddingTop: 0,
    height: '100%',
    backgroundColor: '#c583cb',
  },
  scrollViewContent: {
    flexBasis: '100%',
    maxWidth: '100%',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
  },
  formComponent: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  actionButton: {
    justifyContent: 'center',
    width: '90%',
  },
  startDate: {
    display: 'flex',
    width: '100%',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export const HistoryEntryForm: FunctionComponent<Props> = ({
  setFormValue,
  form,
  save,
}) => {
  const {t} = useTranslation('history');
  const pages: HistoryPage[] = t('pages', {returnObjects: true});
  const [width, setWidth] = useState<number | undefined>();
  const [countries] = useCountries();
  const history = useNavigation();
  const [offset, toNextPage, , onBack] = useScrollView(
    pages.length,
    save,
    history,
    width,
  );
  return (
    <ScrollViewPage
      extendedStyle={styles.safeArea}
      showBack={true}
      onBack={onBack}
      backLabel={t('back')}>
      <View style={styles.wrapper}>
        <ScrollView pagesCount={pages.length} offset={offset}>
          {pages.map(page => {
            return (
              <View style={styles.scrollViewContent}>
                {page.type === 'name' && (
                  <View
                    style={styles.startDate}
                    onLayout={event => {
                      const {width: w} = event.nativeEvent.layout;
                      setWidth(w);
                    }}>
                    <Header2>{page.title}</Header2>
                    <FormInput
                      onChange={setFormValue('name')}
                      label={page.label}
                      placeholder={page.placeholder}
                    />
                    <Button
                      inProgress={false}
                      disabled={false}
                      label={page.action!}
                      onPress={() => toNextPage()}
                      extendedStyle={styles.actionButton}
                    />
                  </View>
                )}
                {page.type === 'relationship' && (
                  <View style={styles.startDate}>
                    <Header2>{page.title}</Header2>
                    <InputSelect
                      theme={authTheme}
                      label={page.label}
                      required={true}
                      onValueChange={setFormValue('type')}
                      items={page.options!}
                    />
                    <Button
                      inProgress={false}
                      disabled={false}
                      label={page.action!}
                      onPress={() => toNextPage()}
                      extendedStyle={styles.actionButton}
                    />
                  </View>
                )}
                {page.type === 'startDate' && (
                  <View style={styles.startDate}>
                    <Header2>{page.title}</Header2>
                    <DateSelect
                      date={form.startDate ?? new Date()}
                      onChange={event => {
                        if (event) {
                          setFormValue('startDate')(event as string);
                        }
                      }}
                    />
                    <Button
                      inProgress={false}
                      disabled={false}
                      label={page.action!}
                      onPress={() => {
                        toNextPage();
                        if (form.type === '3') {
                          setFormValue('duration')('1');
                          setFormValue('durationUnit')('1');
                        }
                      }}
                      extendedStyle={styles.actionButton}
                    />
                  </View>
                )}
                {page.type === 'duration' && (
                  <View style={styles.startDate}>
                    <Header2 extendedStyle={styles.header}>
                      {page.title}
                    </Header2>
                    <View style={styles.col}>
                      <View style={styles.colItem}>
                        <FormInput
                          onChange={setFormValue('duration')}
                          keyboardType={'numeric'}
                          value={form.duration}
                          label={page.label}
                          placeholder={'4'}
                          width={110}
                        />
                      </View>
                      <View style={styles.colItem2}>
                        <InputSelect
                          theme={authTheme}
                          required={true}
                          label={t('unit')}
                          onValueChange={setFormValue('durationUnit')}
                          items={page.options!}
                          width={110}
                        />
                      </View>
                    </View>
                    <View style={{flex: 5}}>
                      <CheckboxComponent
                        title={t('inProgress')}
                        checked={!!form.inProgress}
                        onClick={() => {
                          setFormValue('inProgress')(!form.inProgress);
                        }}
                      />
                    </View>
                    <Button
                      inProgress={false}
                      disabled={false}
                      label={page.action!}
                      onPress={() => toNextPage()}
                      extendedStyle={styles.actionButton}
                    />
                  </View>
                )}
                {page.type === 'country' && (
                  <View style={styles.startDate}>
                    <Header2>{page.title}</Header2>
                    <InputSelect
                      theme={authTheme}
                      required={false}
                      label={page.label}
                      onValueChange={setFormValue('country')}
                      items={countries}
                      width={200}
                    />
                    <Button
                      inProgress={false}
                      disabled={false}
                      label={page.action!}
                      onPress={() => toNextPage()}
                      extendedStyle={styles.actionButton}
                    />
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </ScrollViewPage>
  );
};

const authTheme = {
  ...AmplifyTheme,
  input: {
    ...AmplifyTheme.input,
    width: 220,
  },
  formField: {
    ...AmplifyTheme.formField,
    justifyContent: 'center',
  },
};
