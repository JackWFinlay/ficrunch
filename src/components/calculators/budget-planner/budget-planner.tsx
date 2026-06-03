import CalculatorDescription from '../../calculator-description/calculator-description';
import { BudgetContextProvider } from './budget-context';
import Form from './form';

export default function BudgetPlanner() {
  return (
    <BudgetContextProvider>
      <div className='flex flex-col gap-6'>
        <CalculatorDescription
          title='⚖️ Budget Planner'
          description='Put together a quick budget and see how much you need to save and when'
        />
        <div className='flex gap-6 flex-wrap'>
          <Form />
          {/* <Results /> */}
        </div>
      </div>
    </BudgetContextProvider>
  );
}
