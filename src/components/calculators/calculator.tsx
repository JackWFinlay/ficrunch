import MilestoneCalculator from './milestones/milestone-calculator';
import DebtCalculator from './debt-pay-off/debt-calculator';
import { useCalculatorContext } from '../calculator-selector/calculator-context';
import BudgetPlanner from './budget-planner/budget-planner';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Calculator() {
  const { slug } = useCalculatorContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/');
    }

    if (slug && location.pathname !== `/${slug}`) {
      navigate(`/${slug}`);
    }
  }, [slug, navigate, location]);

  return (
    <Routes>
      <Route path='/' element={<MilestoneCalculator />} />
      <Route path='/debt-pay-off' element={<DebtCalculator />} />
      <Route path='/budget-planner' element={<BudgetPlanner />} />
      <Route path='*' element={<MilestoneCalculator />} />
    </Routes>
  );
}
