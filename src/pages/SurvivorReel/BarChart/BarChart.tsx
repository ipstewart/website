import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
// import Tooltip from './Tooltip/Tooltip';
import { createPortal } from 'react-dom';

interface BarChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

function BarChart({ data }: Readonly<BarChartProps>) {
  const svgElement = useRef<SVGSVGElement | null>(null);

  const svgRef = useRef<d3.Selection<SVGSVGElement | null, unknown, null, undefined> | null>(null);
  const chartRef = useRef<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);
  const xScaleRef = useRef<d3.ScaleBand<string> | null>(null);
  const yScaleRef = useRef<d3.ScaleLinear<number, number, never> | null>(null);
  const xAxisRef = useRef<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);

  const heightRef = useRef<number>(0);
  const widthRef = useRef<number>(0);

  const margin = 25;

  useEffect(() => {
    if (svgElement.current) {
      initChart();
      updateChart();
    }

    const handleResize = () => {
      widthRef.current = (svgRef.current?.node()?.getBoundingClientRect().width ?? 0) - 2 * margin;
      heightRef.current =
        (svgRef.current?.node()?.getBoundingClientRect().height ?? 0) - 2 * margin;

      updateChart();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const initChart = () => {
    svgRef.current = d3.select(svgElement.current);
    chartRef.current = svgRef.current
      ?.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    widthRef.current = (svgRef.current?.node()?.getBoundingClientRect().width ?? 0) - 2 * margin;
    heightRef.current = (svgRef.current?.node()?.getBoundingClientRect().height ?? 0) - 2 * margin;

    chartRef.current = svgRef.current
      ?.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    xScaleRef.current = d3.scaleBand().padding(0.2);
    yScaleRef.current = d3.scaleLinear();

    xAxisRef.current = chartRef.current
      .append('g')
      .style('font-size', '16px')
      .style('font-family', "'Fredoka Variable', sans-serif");
  };

  const updateChart = () => {
    if (xScaleRef.current && yScaleRef.current) {
      xScaleRef.current.domain(data.map((d) => d.name)).range([0, widthRef.current]);
      yScaleRef.current
        .domain([0, d3.max(data.map((d) => d.value)) ?? 10])
        .range([heightRef.current, 0]);

      // Bars
      chartRef.current
        ?.selectAll('.bar')
        .data(data)
        .join((enter) => enter.append('rect').attr('class', 'bar'))
        .attr('x', (d) => xScaleRef.current!(d.name) ?? 0)
        .attr('y', (d) => yScaleRef.current!(d.value) ?? 0)
        .attr('width', xScaleRef.current.bandwidth() ?? 0)
        .attr('height', (d) => heightRef.current - (yScaleRef.current!(d.value) ?? 0))
        .attr('fill', '#3BA84F');

      // Rounded bar tops
      chartRef.current
        ?.selectAll('.top')
        .data(data)
        .join((enter) => enter.append('rect').attr('class', 'top'))
        .attr('x', (d) => xScaleRef.current!(d.name) ?? 0)
        .attr('y', (d) => (yScaleRef.current!(d.value) ?? 0) - 4)
        .attr('rx', 10)
        .attr('ry', 10)
        .attr('width', xScaleRef.current?.bandwidth() ?? 0)
        .attr('height', 10)
        .attr('fill', '#3BA84F');

      // Bar labels
      chartRef.current
        ?.selectAll('.label')
        .data(data)
        .join((enter) =>
          enter
            .append('text')
            .text((d) => d.value)
            .attr('class', 'label'),
        )
        .attr(
          'x',
          (d) => (xScaleRef.current!(d.name) ?? 0) + (xScaleRef.current?.bandwidth() ?? 0) / 2,
        )
        .attr('y', (d) => (yScaleRef.current!(d.value) ?? 0) - 12)
        .attr('font-weight', '700');

      // Create x-axis
      xAxisRef.current
        ?.attr('transform', `translate(0, ${heightRef.current})`)
        .call(d3.axisBottom(xScaleRef.current).tickSize(0).tickPadding(10));
    }
  };

  return <svg ref={svgElement} width="100%" height="100%" />;
}

export default BarChart;
