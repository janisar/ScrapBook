import React, {FunctionComponent, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {RegisterPage} from '../../i18n/models';

type Props = {
  complete: () => void;
  pages: RegisterPage[];
};

export const ScrollViewContainer: FunctionComponent<Props> = ({
  complete,
  pages,
}) => {
  const [offset, setOffset] = useState<number>(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const toNextPage = () => {
    const screenWidth = Dimensions.get('screen').width - 80;
    setOffset(offset + screenWidth);
    setCurrentPageIndex(currentPageIndex + 1);
    if (currentPageIndex >= pages.length) {
      complete();
    }
  };

  const toPreviousPage = () => {
    const screenWidth = Dimensions.get('screen').width - 80;
    setOffset(offset - screenWidth);
    setCurrentPageIndex(currentPageIndex - 1);
  };

  const onBack = () => {
    if (currentPageIndex !== 1) {
      toPreviousPage();
    }
  };
  return <View />;
};
