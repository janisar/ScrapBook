import {Dimensions, Platform} from 'react-native';
import {useEffect, useState} from 'react';

export const useScrollView = (
  totalPages: number,
  complete: () => void,
  history?: any,
  width: number = Dimensions.get('screen').width,
): [number, () => void, () => void, () => void] => {
  const [offset, setOffset] = useState<number>(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  useEffect(() => {
    setOffset(0);
  }, []);

  const toNextPage = () => {
    setOffset(offset + width);
    setCurrentPageIndex(currentPageIndex + 1);
    if (currentPageIndex >= totalPages) {
      complete();
      setOffset(0);
      setCurrentPageIndex(0);
    }
  };

  const toPreviousPage = () => {
    setOffset(offset - width);
    setCurrentPageIndex(currentPageIndex - 1);
  };

  const onBack = () => {
    if (currentPageIndex !== 1) {
      toPreviousPage();
    } else {
      history?.goBack();
    }
  };

  return [offset, toNextPage, toPreviousPage, onBack];
};
