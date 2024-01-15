import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

// import Tooltip from './Tooltip/Tooltip';

interface DonutChartProps {
  data: number[];
  colors: string[];
}

function DonutChart({ data, colors }: Readonly<DonutChartProps>) {
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

    // chartRef.current = svgRef.current
    //   ?.append('g')
    //   .attr('transform', `translate(${margin}, ${margin})`);

    // xScaleRef.current = d3.scaleBand().padding(0.2);
    // yScaleRef.current = d3.scaleLinear();

    // xAxisRef.current = chartRef.current
    //   .append('g')
    //   .style('font-size', '16px')
    //   .style('font-family', "'Fredoka Variable', sans-serif");
  };

  const updateChart = () => {
    const radius = Math.min(widthRef.current, heightRef.current) / 2;
    const innerRadius = radius / 2;

    const arc = d3.arc().outerRadius(radius).innerRadius(innerRadius);

    const pie = d3.pie<number>().value((d) => d);

    chartRef.current
      ?.selectAll('.arc')
      .data(pie(data))
      .join((enter) => enter.append('g').attr('class', 'arc').append('path'))
      .attr('transform', `translate(${widthRef.current / 2},${heightRef.current / 2})`)
      .attr('d', (d) => arc(d) as string)
      .attr('fill', (d, i) => colors[i]);

    // chartRef.current?.selectAll('.arc')
    //   .data(pie(data))
    //   .join(
    //     enter => enter.append('path')
    //   )?.attr('d', (d) => arc(d) as string)?.attr('fill', (d, i) => colors[i]);
  };

  return <svg ref={svgElement} width="100%" height="100%" />;
}

export default DonutChart;
