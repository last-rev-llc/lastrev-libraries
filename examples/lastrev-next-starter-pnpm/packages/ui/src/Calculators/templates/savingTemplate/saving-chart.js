import { numberWithCommas } from '../../utils/helpers';

const defaultTextStyle = (color, weight = 'normal', fontSize = '14px') => `font-family: Muli;
font-style: normal;
font-weight: ${weight} ;
font-size: ${fontSize};
color: ${color};
line-height: 23px;`;

const labelTextStyle = `
  font-family: 'Muli';
  font-size: 9.1px;
  color: #595959;
  font-weight: 700;
`;

export const chartSavingTemplate = ({ isMobile, aggregatedNetContributions, cumulativeAssetGrowth, years, max }) => ({
  exporting: {
    enabled: false
  },
  credits: {
    enabled: false
  },
  chart: {
    type: 'column',
    spacingBottom: 110,
    backgroundColor: 'white',
    height: '520px',
    events: {
      render() {
        console.log('savingChart', this);
        for (const serie of this.series) {
          if (!serie) continue;
          serie.legendSymbol.attr({
            width: 35
          }),
            serie.legendItem.attr({
              x: 45
            });
        }
      }
    }
  },
  title: {
    text: ''
  },
  xAxis: {
    categories: years,
    gridLineWidth: 0,
    useHTML: true,
    labels: {
      formatter: function (e) {
        const { pos, value } = e;
        return `<div>
        <p>${value}</p>
        <br />
        ${
          (pos === 0 || pos === years.length - 1) && !isMobile
            ? `
            <p style="${labelTextStyle}">|</p>
        <br />
        <p style="${labelTextStyle}">${pos === 0 ? 'Today' : 'Retirement'} </p>
        </div>`
            : ''
        }
        `;
      },
      style: {
        color: '#ABABAB',
        fontFamily: 'Muli',
        fontSize: isMobile ? '9px' : '10px'
      }
    }
  },
  yAxis: {
    visible: !isMobile, // create isMobileView? to detect if this should be drawn
    opposite: true,
    min: 0,
    gridLineWidth: 0,
    title: {
      text: '.'
    },
    stackLabels: {
      enabled: false
    },
    labels: {
      formatter: function (data) {
        const { value } = data;
        return `$${numberWithCommas(value)}`;
      },
      style: {
        color: '#ABABAB',
        fontFamily: 'Muli',
        fontSize: '12px',
        fontWeight: '400'
      }
    },
    max: max
  },
  legend: {
    align: 'left',
    x: 0,
    verticalAlign: 'bottom',
    y: 120,
    floating: true,
    backgroundColor: 'transparent',
    borderWidth: 0,
    shadow: false,
    padding: 20,
    layout: 'vertical',
    itemMarginBottom: 2,
    itemStyle: {
      fontSize: !isMobile ? '14px' : '8px',
      fontFamily: 'Muli',
      lineHeight: '24px',
      fontWeight: '400'
    },
    itemMarginTop: 2,
    symbolRadius: 0
  },
  tooltip: {
    enabled: max === null,
    backgroundColor: 'white',
    borderColor: '#ababab',
    shadow: false,
    useHTML: true,
    borderRadius: 10,
    formatter: function () {
      const { total, y, series } = this;
      const isCumulative = series.name === 'Cumulative asset growth';
      return `<div style="padding: 5px 50px 5px 12px;">
              <span style="${defaultTextStyle('#489A93', 600, '16px')} ">Total Balance: $${numberWithCommas(
        Math.round(total)
      )}</span>
              <br>
              <span style="${defaultTextStyle('#569CDF')}">Asset Growth : $${numberWithCommas(
        Math.round(!isCumulative ? total - y : y)
      )}</span>
              <br>
              <span style="${defaultTextStyle('#6D58D6')}">Net Deposits : $${numberWithCommas(
        Math.round(!isCumulative ? y : total - y)
      )} </span>
              <br>
          </div>`;
    }
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      groupPadding: 0.1,
      dataLabels: {
        enabled: false
      }
    }
  },
  series: [
    {
      name: 'Cumulative Asset Growth',
      data: aggregatedNetContributions,
      color: '#9CC0E6'
    },
    {
      name: 'Cumulative Net Deposits',
      data: cumulativeAssetGrowth,
      color: '#6D58D6'
    }
  ]
});
