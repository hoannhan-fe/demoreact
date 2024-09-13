import { createContext, useContext, useState, ReactNode } from 'react';
import { FontControl } from '../data/FontSizeControl.data';

const useFontSizeState = (initialFontSize: FontControl) =>
  useState<FontControl>(initialFontSize);
const FontSizeContext = createContext<ReturnType<
  typeof useFontSizeState
> | null>(null);

export const useFontSize = () => {
  const fontSize = useContext(FontSizeContext);
  if (!fontSize) {
    throw new Error('useFontSize err');
  }
  return fontSize;
};

export const FontSizeProvider = ({
  size: initialFontSize,
  children,
}: {
  size: FontControl;
  children: ReactNode;
}) => {
  const [fontSize, setFontSize] = useFontSizeState(initialFontSize);

  return (
    <FontSizeContext.Provider value={[fontSize, setFontSize]}>
      {children}
    </FontSizeContext.Provider>
  );
};
