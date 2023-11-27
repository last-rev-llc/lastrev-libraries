import React from 'react';
import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact from 'highcharts-react-official';
import { ChartContainer } from './styled';

const Chart2 = ({ options }) => {
  if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts);
  }
  return (
    <ChartContainer>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ChartContainer>
  );
};

export default Chart2;
