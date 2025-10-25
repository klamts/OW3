import React, { createContext, useContext, useState } from 'react';

type TextVisibilityContextType = {
  visible: boolean;
  setVisible: (v: boolean) => void;
};

const TextVisibilityContext = createContext<TextVisibilityContextType | null>(null);

export const TextVisibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(true);
  return (
    <TextVisibilityContext.Provider value={{ visible, setVisible }}>
      {children}
    </TextVisibilityContext.Provider>
  );
};

export const useTextVisibility = () => {
  const ctx = useContext(TextVisibilityContext);
  if (!ctx) throw new Error('useTextVisibility must be used within TextVisibilityProvider');
  return ctx;
};

export default TextVisibilityContext;
