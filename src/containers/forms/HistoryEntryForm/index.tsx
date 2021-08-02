import React, { FunctionComponent, useCallback } from "react";
import {View, StyleSheet} from 'react-native';
import {PartnerForm} from '../../../models';
import {Header2} from '../../../components/atoms/Header2';
import {Input} from '../../../components/atoms/Input';
import {Select} from '../../../components/atoms/Select';
import {DateSelect} from '../../../components/atoms/Date';
import {CheckboxComponent} from '../../../components/atoms/Checkbox';
import {useTranslation} from 'react-i18next';
import {ScrollView} from '../../../components/atoms/ScrollView';
import {HistoryPage} from '../../../i18n/models';
import {InputComponent} from '../../../components/molecules/AgeComponent';
import {useScrollView} from '../../../hooks/useScrollView';
import {ScrollViewPage} from '../../../components/molecules/ScrollViewPage';
import Button from '../../../components/molecules/Button';
import {Text} from '../../../components/atoms/Text';
import { useNavigation } from "@react-navigation/native";

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
  col: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  safeArea: {
    paddingTop: 0,
    height: '100%',
    backgroundColor: 'purple',
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
    alignSelf: 'flex-end',
  },
  startDate: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export const HistoryEntryForm: FunctionComponent<Props> = ({
  setFormValue,
  form,
  save,
}) => {
  const {t} = useTranslation('history');
  const pages: HistoryPage[] = t('pages', {returnObjects: true});
  const history = useNavigation();
  const [offset, toNextPage, , onBack] = useScrollView(pages.length, save, history);
  return (
    <ScrollViewPage
      extendedStyle={styles.safeArea}
      onBack={onBack}
      backLabel={'Back'}>
      <View style={styles.wrapper}>
        <ScrollView pages={pages} offset={offset}>
          {pages.map(page => {
            return (
              <View style={styles.scrollViewContent}>
                {page.type === 'name' && (
                  <>
                    <Header2>{page.title}</Header2>
                    <InputComponent
                      onChange={setFormValue('name')}
                      page={page}
                      onNext={toNextPage}
                      width={160}
                      placeholder={page.placeholder}
                    />
                  </>
                )}
                {page.type === 'relationship' && (
                  <>
                    <Header2>{page.title}</Header2>
                    <Select
                      onChange={setFormValue('type')}
                      items={page.options!}
                      placeholder={'Select Type'}
                      onNext={() => {}}
                    />
                    <Button
                      inProgress={false}
                      disabled={false}
                      label={page.action!}
                      onPress={() => toNextPage()}
                      extendedStyle={{}}
                    />
                  </>
                )}
                {page.type === 'startDate' && (
                  <View style={styles.startDate}>
                    <Header2>{page.title}</Header2>
                    <DateSelect
                      date={form.startDate ?? new Date()}
                      onChange={setFormValue('startDate')}
                    />
                    <Button
                      inProgress={false}
                      disabled={false}
                      label={page.action!}
                      onPress={() => toNextPage()}
                      extendedStyle={{}}
                    />
                  </View>
                )}
                {page.type === 'duration' && (
                  <View style={styles.startDate}>
                    <Header2>{page.title}</Header2>
                    <View style={styles.col}>
                      <View style={{marginTop: 20}}>
                        <Input
                          onChange={setFormValue('duration')}
                          keyboardType={'numeric'}
                          editable={!form.inProgress}
                        />
                      </View>
                      <View style={{marginLeft: 20}}>
                        <Select
                          onChange={setFormValue('durationUnit')}
                          items={page.options!}
                          placeholder={'Select unit'}
                          onNext={() => {}}
                        />
                      </View>
                    </View>
                    <View style={{flex: 4, width: 140}}>
                      <CheckboxComponent
                        title={'still in progress'}
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
              </View>
            );
          })}
        </ScrollView>
      </View>
    </ScrollViewPage>
  );
};