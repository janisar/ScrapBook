import {Dimensions, Platform} from 'react-native';
import {useState} from 'react';

export const useScrollView = (
  totalPages: number,
  complete: () => void,
  history?: any,
): [number, () => void, () => void, () => void] => {
  const [offset, setOffset] = useState<number>(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const toNextPage = () => {
    const screenWidth =
      Dimensions.get('screen').width - (Platform.OS === 'ios' ? 80 : 100);
    setOffset(offset + screenWidth);
    setCurrentPageIndex(currentPageIndex + 1);
    if (currentPageIndex >= totalPages) {
      complete();
    }
  };

  const toPreviousPage = () => {
    const screenWidth =
      Dimensions.get('screen').width - (Platform.OS === 'ios' ? 80 : 100);
    setOffset(offset - screenWidth);
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
