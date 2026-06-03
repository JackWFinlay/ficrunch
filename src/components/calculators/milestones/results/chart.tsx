import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  Bar,
  YAxis,
  type MouseHandlerDataParam,
  Rectangle,
  type BarShapeProps,
} from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart';
import type { ChartData } from '@/models/resultsData';
import { useCalculationContext } from '@/components/calculators/milestones/calculation-context';
import { toLocaleCurrencyShort } from '@/lib/utils';
import { useLocale } from '@/components/locale/locale-provider';
import { useMemo } from 'react';

export default function Chart({ chartData }: { chartData: ChartData[] }) {
  const { selectedIndex, setSelectedIndex } = useCalculationContext();

  const { locale } = useLocale();

  // Handler for when mouse moves over a bar (or chart area)
  const handleMouseMove = (e: MouseHandlerDataParam) => {
    setSelectedIndex(e.activeTooltipIndex as number);
  };

  // Handler to hide tooltip when mouse leaves
  const handleMouseLeave = () => {
    setSelectedIndex(undefined);
  };

  const chartConfig = {
    interest: {
      label: 'Interest',
      color: 'var(--chart-1)',
    },
    contributions: {
      label: 'Contributions',
      color: 'var(--chart-2)',
    },
    total: {
      label: 'Total',
      color: 'var(--foreground)',
    },
  } satisfies ChartConfig;

  type BarProps = {
    color: string;
    opacity: number;
    props: BarShapeProps;
    index: number;
  };

  function CustomBar({ color, opacity, props, index }: BarProps) {
    const bar = useMemo(() => {
      return (
        <Rectangle
          {...props}
          key={`rectangle-${index}`}
          fill={`var(${color})`}
          opacity={opacity}
        />
      );
    }, [color, opacity, props]);

    return bar;
  }

  const ContributionsRectangle = (props: BarShapeProps) => {
    return (
      <CustomBar
        color='--chart-2'
        opacity={props.index == selectedIndex ? 1 : 0.25}
        props={props}
        index={props.index}
      />
    );
  };

  const InterestRectangle = (props: BarShapeProps) => {
    return (
      <CustomBar
        color='--chart-1'
        opacity={props.index == selectedIndex ? 1 : 0.25}
        props={props}
        index={props.index}
      />
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>📊 Chart</CardTitle>
        <CardDescription className='text-xs text-light'>
          Line goes up
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col justify-center overflow-x-auto gap-5'>
          <div className='flex'>
            <ChartContainer
              config={chartConfig}
              className='flex aspect-2 w-full'
            >
              <BarChart
                accessibilityLayer
                data={chartData}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <CartesianGrid vertical={false} />
                <YAxis
                  tickFormatter={(value) =>
                    toLocaleCurrencyShort(value, locale)
                  }
                  stroke='var(--foreground)'
                  tick={{ fill: 'var(--foreground)' }}
                />
                <XAxis
                  dataKey='year'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={true}
                />
                <ChartLegend
                  content={
                    <ChartLegendContent verticalAlign='middle' payload={null} />
                  }
                ></ChartLegend>
                <Bar
                  dataKey='contributions'
                  stackId='a'
                  fill='var(--chart-2)'
                  shape={ContributionsRectangle}
                ></Bar>
                <Bar
                  dataKey='interest'
                  stackId='a'
                  fill='var(--chart-1)'
                  shape={InterestRectangle}
                ></Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
