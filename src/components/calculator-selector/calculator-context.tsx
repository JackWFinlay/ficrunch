import { createContext, useContext, useState } from 'react';
import { Calculator } from '@/models/enums';

const initialState = {
  calculator: Calculator.Milestones,
  setCalculator: () => {},
  slug: '',
  setSlug: () => {},
} as CalculatorContextState;

type CalculatorContextState = {
  calculator: string;
  setCalculator: (calculator: string) => void;
  slug: string;
  setSlug: (slug: string) => void;
};

type CalculatorContextProps = {
  children: React.ReactNode;
  storageKey?: string;
  slugKey?: string;
  defaultCalculator?: string;
};

const CalculatorContext = createContext<CalculatorContextState>(initialState);

export function CalculatorContextProvider({
  children,
  storageKey = 'calculator',
  slugKey = 'calculator-slug',
  defaultCalculator = Calculator.Milestones,
  ...props
}: CalculatorContextProps) {
  const [calculator, setCalculator] = useState<string>(
    () => localStorage.getItem(storageKey) || defaultCalculator,
  );

  const [slug, setSlug] = useState<string>(
    () => localStorage.getItem(slugKey) || '',
  );

  const values = {
    calculator,
    slug,
    setCalculator: (calculator: string) => {
      localStorage.setItem(storageKey, calculator);
      setCalculator(calculator);
    },
    setSlug: (slug: string) => {
      localStorage.setItem(slugKey, slug);
      setSlug(slug);
    },
  };

  return (
    <CalculatorContext.Provider {...props} value={values}>
      {children}
    </CalculatorContext.Provider>
  );
}

export const useCalculatorContext = () => {
  const context = useContext(CalculatorContext);

  if (context === undefined)
    throw new Error(
      'useCalculatorContext must be used within a CalculatorContextProvider',
    );

  return context;
};
