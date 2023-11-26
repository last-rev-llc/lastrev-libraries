const getStateBrackets = (filing_status, stateId) => {
  const isSingle = filing_status === 'single';
  switch (stateId) {
    case 'AL' /* Check out phase-out */:
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 500,
              rate: 0.02,
              bracketTax: 0
            },
            {
              low: 500,
              high: 3000,
              rate: 0.04,
              bracketTax: 10
            },
            {
              low: 3000,
              high: null,
              rate: 0.05,
              bracketTax: 110
            }
          ],
          stdDeduction: 4000,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 1000,
            rate: 0.02,
            bracketTax: 0
          },
          {
            low: 1000,
            high: 6000,
            rate: 0.04,
            bracketTax: 20
          },
          {
            low: 6000,
            high: null,
            rate: 0.05,
            bracketTax: 220
          }
        ],
        stdDeduction: 10500,
        otherDeductions: 0,
        credit: 0
      };
    case 'AZ':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 27808,
              rate: 0.0259,
              bracketTax: 0
            },
            {
              low: 27808,
              high: 55615,
              rate: 0.0334,
              bracketTax: 720.23
            },
            {
              low: 55615,
              high: 166843,
              rate: 0.0417,
              bracketTax: 1648.98
            },
            {
              low: 166843,
              high: 250000,
              rate: 0.045,
              bracketTax: 6287.19
            }
          ],
          stdDeduction: 12950,
          otherDeductions: 0,
          credit: 0,
          excemptions: {
            excessIncome: 250000,
            excessRate: 0.01,
            surchargeRate: 0.035,
            bracketTax: 10052.75
          }
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 55615,
            rate: 0.0259,
            bracketTax: 0
          },
          {
            low: 55615,
            high: 111229,
            rate: 0.0334,
            bracketTax: 1440.43
          },
          {
            low: 111229,
            high: 333684,
            rate: 0.0417,
            bracketTax: 3297.94
          },
          {
            low: 333684,
            high: 500000,
            rate: 0.045,
            bracketTax: 12574.31
          }
        ],
        stdDeduction: 25900,
        otherDeductions: 0,
        credit: 0,
        excemptions: {
          excessIncome: 500000,
          excessRate: 0.01,
          surchargeRate: 0.035,
          bracketTax: 20105.53
        }
      };
    case 'AR':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 4700,
              rate: 0,
              bracketTax: 0
            },
            {
              low: 4700,
              high: 9200,
              rate: 0.02,
              bracketTax: 0
            },
            {
              low: 9200,
              high: 13900,
              rate: 0.03,
              bracketTax: 90
            },
            {
              low: 13900,
              high: 22900,
              rate: 0.034,
              bracketTax: 231
            },
            {
              low: 22900,
              high: 38500,
              rate: 0.05,
              bracketTax: 537
            },
            {
              low: 38500,
              high: null,
              rate: 0.059,
              bracketTax: 1317
            }
          ],
          stdDeduction: 2200,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 4700,
            rate: 0,
            bracketTax: 0
          },
          {
            low: 4700,
            high: 9200,
            rate: 0.02,
            bracketTax: 0
          },
          {
            low: 9200,
            high: 13900,
            rate: 0.03,
            bracketTax: 90
          },
          {
            low: 13900,
            high: 22900,
            rate: 0.034,
            bracketTax: 231
          },
          {
            low: 22900,
            high: 38500,
            rate: 0.05,
            bracketTax: 537
          },
          {
            low: 38500,
            high: null,
            rate: 0.059,
            bracketTax: 1317
          }
        ],
        stdDeduction: 4400,
        otherDeductions: 0,
        credit: 0
      };
    case 'CA':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 9325,
              rate: 0.01,
              bracketTax: 0
            },
            {
              low: 9325,
              high: 22107,
              rate: 0.02,
              bracketTax: 93.25
            },
            {
              low: 22107,
              high: 34892,
              rate: 0.04,
              bracketTax: 348.89
            },
            {
              low: 34892,
              high: 48435,
              rate: 0.06,
              bracketTax: 860.29
            },
            {
              low: 48435,
              high: 61214,
              rate: 0.08,
              bracketTax: 1672.87
            },
            {
              low: 61214,
              high: 312686,
              rate: 0.093,
              bracketTax: 2695.19
            },
            {
              low: 312686,
              high: 375221,
              rate: 0.103,
              bracketTax: 26082.086
            },
            {
              low: 375221,
              high: 625369,
              rate: 0.113,
              bracketTax: 32523.191
            },
            {
              low: 625369,
              high: 1000000,
              rate: 0.123,
              bracketTax: 60789.915
            },
            {
              low: 1000000,
              high: null,
              rate: 0.133,
              bracketTax: 106869.528
            }
          ],
          stdDeduction: 4803,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 18650,
            rate: 0.01,
            bracketTax: 0
          },
          {
            low: 18650,
            high: 44214,
            rate: 0.02,
            bracketTax: 186.5
          },
          {
            low: 44214,
            high: 69784,
            rate: 0.04,
            bracketTax: 697.78
          },
          {
            low: 69784,
            high: 96870,
            rate: 0.06,
            bracketTax: 1720.58
          },
          {
            low: 96870,
            high: 122428,
            rate: 0.08,
            bracketTax: 3345.74
          },
          {
            low: 122428,
            high: 625372,
            rate: 0.093,
            bracketTax: 5390.38
          },
          {
            low: 625372,
            high: 750442,
            rate: 0.103,
            bracketTax: 52164.172
          },
          {
            low: 750442,
            high: 1250738,
            rate: 0.113,
            bracketTax: 65046.382
          },
          {
            low: 1250738,
            high: 2000000,
            rate: 0.123,
            bracketTax: 121579.83
          },
          {
            low: 2000000,
            high: null,
            rate: 0.133,
            bracketTax: 213739.056
          }
        ],
        stdDeduction: 9606,
        otherDeductions: 0,
        credit: 0
      };
    case 'CO':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: null,
              rate: 0.0455,
              bracketTax: 0
            }
          ],
          stdDeduction: 12950,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: null,
            rate: 0.0455,
            bracketTax: 0
          }
        ],
        stdDeduction: 25900,
        otherDeductions: 0,
        credit: 0
      };
    case 'CT':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 10000,
              rate: 0.03,
              bracketTax: 0
            },
            {
              low: 10000,
              high: 50000,
              rate: 0.05,
              bracketTax: 300
            },
            {
              low: 50000,
              high: 100000,
              rate: 0.055,
              bracketTax: 2300
            },
            {
              low: 100000,
              high: 200000,
              rate: 0.06,
              bracketTax: 5050
            },
            {
              low: 200000,
              high: 250000,
              rate: 0.065,
              bracketTax: 11050
            },
            {
              low: 250000,
              high: 500000,
              rate: 0.069,
              bracketTax: 14300
            },
            {
              low: 500000,
              high: null,
              rate: 0.0699,
              bracketTax: 31550
            }
          ],
          stdDeduction: [
            15000, 14000, 13000, 12000, 11000, 10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000,
            2000, 1000, 0
          ],
          otherDeductions: 0,
          credit: 0,
          excemptions: {
            lowend: 30000,
            highend: 44000,
            step: 1000
          }
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 20000,
            rate: 0.03,
            bracketTax: 0
          },
          {
            low: 20000,
            high: 100000,
            rate: 0.05,
            bracketTax: 600
          },
          {
            low: 100000,
            high: 200000,
            rate: 0.055,
            bracketTax: 4600
          },
          {
            low: 200000,
            high: 400000,
            rate: 0.06,
            bracketTax: 10100
          },
          {
            low: 400000,
            high: 500000,
            rate: 0.065,
            bracketTax: 22100
          },
          {
            low: 500000,
            high: 1000000,
            rate: 0.069,
            bracketTax: 28600
          },
          {
            low: 1000000,
            high: null,
            rate: 0.0699,
            bracketTax: 63100
          }
        ],
        stdDeduction: [
          24000, 23000, 22000, 21000, 20000, 19000, 18000, 17000, 16000, 15000, 14000, 13000, 12000,
          11000, 10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 0
        ],
        otherDeductions: 0,
        credit: 0,
        excemptions: {
          lowend: 48000,
          highend: 71000,
          step: 1000
        }
      };
    case 'DE':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 2000,
              rate: 0,
              bracketTax: 0
            },
            {
              low: 2000,
              high: 5000,
              rate: 0.022,
              bracketTax: 0
            },
            {
              low: 5000,
              high: 10000,
              rate: 0.039,
              bracketTax: 66
            },
            {
              low: 10000,
              high: 20000,
              rate: 0.048,
              bracketTax: 261
            },
            {
              low: 20000,
              high: 25000,
              rate: 0.052,
              bracketTax: 741
            },
            {
              low: 25000,
              high: 60000,
              rate: 0.0555,
              bracketTax: 1001
            },
            {
              low: 60000,
              high: null,
              rate: 0.066,
              bracketTax: 2943.5
            }
          ],
          stdDeduction: 3360,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 2000,
            rate: 0,
            bracketTax: 0
          },
          {
            low: 2000,
            high: 5000,
            rate: 0.022,
            bracketTax: 0
          },
          {
            low: 5000,
            high: 10000,
            rate: 0.039,
            bracketTax: 66
          },
          {
            low: 10000,
            high: 20000,
            rate: 0.048,
            bracketTax: 261
          },
          {
            low: 20000,
            high: 25000,
            rate: 0.052,
            bracketTax: 741
          },
          {
            low: 25000,
            high: 60000,
            rate: 0.0555,
            bracketTax: 1001
          },
          {
            low: 60000,
            high: null,
            rate: 0.066,
            bracketTax: 2943.5
          }
        ],
        stdDeduction: 6720,
        otherDeductions: 0,
        credit: 0
      };
    case 'GA':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 750,
              rate: 0.01,
              bracketTax: 0
            },
            {
              low: 750,
              high: 2250,
              rate: 0.02,
              bracketTax: 7.5
            },
            {
              low: 2250,
              high: 3750,
              rate: 0.03,
              bracketTax: 37.5
            },
            {
              low: 3750,
              high: 5250,
              rate: 0.04,
              bracketTax: 82.5
            },
            {
              low: 5250,
              high: 7000,
              rate: 0.05,
              bracketTax: 142.5
            },
            {
              low: 7000,
              high: null,
              rate: 0.0575,
              bracketTax: 230
            }
          ],
          stdDeduction: 7300,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 1000,
            rate: 0.01,
            bracketTax: 0
          },
          {
            low: 1000,
            high: 3000,
            rate: 0.02,
            bracketTax: 10
          },
          {
            low: 3000,
            high: 5000,
            rate: 0.03,
            bracketTax: 50
          },
          {
            low: 5000,
            high: 7000,
            rate: 0.04,
            bracketTax: 110
          },
          {
            low: 7000,
            high: 10000,
            rate: 0.05,
            bracketTax: 190
          },
          {
            low: 10000,
            high: null,
            rate: 0.0575,
            bracketTax: 340
          }
        ],
        stdDeduction: 13400,
        otherDeductions: 0,
        credit: 0
      };
    case 'HI':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 2400,
              rate: 0.014,
              bracketTax: 0
            },
            {
              low: 2400,
              high: 4800,
              rate: 0.032,
              bracketTax: 33.6
            },
            {
              low: 4800,
              high: 9600,
              rate: 0.055,
              bracketTax: 110.4
            },
            {
              low: 9600,
              high: 14400,
              rate: 0.064,
              bracketTax: 374.4
            },
            {
              low: 14400,
              high: 19200,
              rate: 0.068,
              bracketTax: 681.6
            },
            {
              low: 19200,
              high: 24000,
              rate: 0.072,
              bracketTax: 1008
            },
            {
              low: 24000,
              high: 36000,
              rate: 0.076,
              bracketTax: 1353.6
            },
            {
              low: 36000,
              high: 48000,
              rate: 0.079,
              bracketTax: 2265.6
            },
            {
              low: 48000,
              high: 150000,
              rate: 0.0825,
              bracketTax: 3213.6
            },
            {
              low: 150000,
              high: 175000,
              rate: 0.09,
              bracketTax: 11628.6
            },
            {
              low: 175000,
              high: 200000,
              rate: 0.1,
              bracketTax: 13878.6
            },
            {
              low: 200000,
              high: null,
              rate: 0.11,
              bracketTax: 16378.6
            }
          ],
          stdDeduction: 3344,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 4800,
            rate: 0.014,
            bracketTax: 0
          },
          {
            low: 4800,
            high: 9600,
            rate: 0.032,
            bracketTax: 67.2
          },
          {
            low: 9600,
            high: 19200,
            rate: 0.055,
            bracketTax: 220.8
          },
          {
            low: 19200,
            high: 28800,
            rate: 0.064,
            bracketTax: 748.8
          },
          {
            low: 28800,
            high: 38400,
            rate: 0.068,
            bracketTax: 1363.2
          },
          {
            low: 38400,
            high: 48000,
            rate: 0.072,
            bracketTax: 2016
          },
          {
            low: 48000,
            high: 72000,
            rate: 0.076,
            bracketTax: 2707.2
          },
          {
            low: 72000,
            high: 96000,
            rate: 0.079,
            bracketTax: 4531.2
          },
          {
            low: 96000,
            high: 300000,
            rate: 0.0825,
            bracketTax: 6427.2
          },
          {
            low: 300000,
            high: 350000,
            rate: 0.09,
            bracketTax: 23257.2
          },
          {
            low: 350000,
            high: 400000,
            rate: 0.1,
            bracketTax: 27757.2
          },
          {
            low: 400000,
            high: null,
            rate: 0.11,
            bracketTax: 32757.2
          }
        ],
        stdDeduction: 6688,
        otherDeductions: 0,
        credit: 0
      };
    case 'ID':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 1588,
              rate: 0.01,
              bracketTax: 0
            },
            {
              low: 1588,
              high: 4763,
              rate: 0.03,
              bracketTax: 15.88
            },
            {
              low: 4763,
              high: 7939,
              rate: 0.045,
              bracketTax: 111.13
            },
            {
              low: 7939,
              high: null,
              rate: 0.06,
              bracketTax: 254.05
            }
          ],
          stdDeduction: 12950,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 3176,
            rate: 0.01,
            bracketTax: 0
          },
          {
            low: 3176,
            high: 9526,
            rate: 0.03,
            bracketTax: 31.76
          },
          {
            low: 9526,
            high: 15878,
            rate: 0.045,
            bracketTax: 222.26
          },
          {
            low: 15878,
            high: null,
            rate: 0.06,
            bracketTax: 508.1
          }
        ],
        stdDeduction: 25900,
        otherDeductions: 0,
        credit: 0
      };
    case 'IL':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: null,
              rate: 0.0495,
              bracketTax: 0
            }
          ],
          stdDeduction: 2375,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: null,
            rate: 0.0495,
            bracketTax: 0
          }
        ],
        stdDeduction: 4750,
        otherDeductions: 0,
        credit: 0
      };
    case 'IN':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: null,
              rate: 0.0323,
              bracketTax: 0
            }
          ],
          stdDeduction: 0,
          otherDeductions: 1000,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: null,
            rate: 0.0323,
            bracketTax: 0
          }
        ],
        stdDeduction: 0,
        otherDeductions: 2000,
        credit: 0
      };
    case 'IA':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 1743,
              rate: 0.0033,
              bracketTax: 0
            },
            {
              low: 1743,
              high: 3486,
              rate: 0.0067,
              bracketTax: 5.75
            },
            {
              low: 3486,
              high: 6972,
              rate: 0.0225,
              bracketTax: 17.43
            },
            {
              low: 6972,
              high: 15687,
              rate: 0.0414,
              bracketTax: 95.87
            },
            {
              low: 15687,
              high: 26145,
              rate: 0.0563,
              bracketTax: 456.67
            },
            {
              low: 26145,
              high: 34860,
              rate: 0.0596,
              bracketTax: 1045.45
            },
            {
              low: 34860,
              high: 52290,
              rate: 0.0625,
              bracketTax: 1564.87
            },
            {
              low: 52290,
              high: 78435,
              rate: 0.0744,
              bracketTax: 2654.24
            },
            {
              low: 78435,
              high: null,
              rate: 0.0853,
              bracketTax: 4599.43
            }
          ],
          stdDeduction: 2210,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 1743,
            rate: 0.0033,
            bracketTax: 0
          },
          {
            low: 1743,
            high: 3486,
            rate: 0.0067,
            bracketTax: 5.75
          },
          {
            low: 3486,
            high: 6972,
            rate: 0.0225,
            bracketTax: 17.43
          },
          {
            low: 6972,
            high: 15687,
            rate: 0.0414,
            bracketTax: 95.87
          },
          {
            low: 15687,
            high: 26145,
            rate: 0.0563,
            bracketTax: 456.67
          },
          {
            low: 26145,
            high: 34860,
            rate: 0.0596,
            bracketTax: 1045.45
          },
          {
            low: 34860,
            high: 52290,
            rate: 0.0625,
            bracketTax: 1564.87
          },
          {
            low: 52290,
            high: 78435,
            rate: 0.0744,
            bracketTax: 2654.24
          },
          {
            low: 78435,
            high: null,
            rate: 0.0853,
            bracketTax: 4599.43
          }
        ],
        stdDeduction: 5450,
        otherDeductions: 0,
        credit: 0
      };
    case 'KS':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 15000,
              rate: 0.031,
              bracketTax: 0
            },
            {
              low: 15000,
              high: 30000,
              rate: 0.0525,
              bracketTax: 465
            },
            {
              low: 30000,
              high: null,
              rate: 0.057,
              bracketTax: 1252.5
            }
          ],
          stdDeduction: 5750,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 30000,
            rate: 0.031,
            bracketTax: 0
          },
          {
            low: 30000,
            high: 60000,
            rate: 0.0525,
            bracketTax: 930
          },
          {
            low: 60000,
            high: null,
            rate: 0.057,
            bracketTax: 2505
          }
        ],
        stdDeduction: 12500,
        otherDeductions: 0,
        credit: 0
      };
    case 'KY':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: null,
              rate: 0.05,
              bracketTax: 0
            }
          ],
          stdDeduction: 2770,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: null,
            rate: 0.05,
            bracketTax: 0
          }
        ],
        stdDeduction: 5540,
        otherDeductions: 0,
        credit: 0
      };
    case 'LA' /**/:
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 12500,
              rate: 0.0185,
              bracketTax: 0
            },
            {
              low: 12500,
              high: 50000,
              rate: 0.035,
              bracketTax: 231.25
            },
            {
              low: 50000,
              high: null,
              rate: 0.0425,
              bracketTax: 1543.75
            }
          ],
          stdDeduction: 4500,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 25000,
            rate: 0.0185,
            bracketTax: 0
          },
          {
            low: 25000,
            high: 100000,
            rate: 0.035,
            bracketTax: 462.5
          },
          {
            low: 100000,
            high: null,
            rate: 0.0425,
            bracketTax: 3087.5
          }
        ],
        stdDeduction: 9000,
        otherDeductions: 0,
        credit: 0
      };
    case 'ME':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 23000,
              rate: 0.058,
              bracketTax: 0
            },
            {
              low: 23000,
              high: 54450,
              rate: 0.0675,
              bracketTax: 1334
            },
            {
              low: 54450,
              high: null,
              rate: 0.0715,
              bracketTax: 3456.88
            }
          ],
          stdDeduction: 17400,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 46000,
            rate: 0.058,
            bracketTax: 0
          },
          {
            low: 46000,
            high: 108900,
            rate: 0.0675,
            bracketTax: 2668
          },
          {
            low: 108900,
            high: null,
            rate: 0.0715,
            bracketTax: 6913.75
          }
        ],
        stdDeduction: 34800,
        otherDeductions: 0,
        credit: 0
      };
    case 'MD' /* NO PHASEOUT HAS BEEN HANDLED */:
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 1000,
              rate: 0.02,
              bracketTax: 0
            },
            {
              low: 1000,
              high: 2000,
              rate: 0.03,
              bracketTax: 20
            },
            {
              low: 2000,
              high: 3000,
              rate: 0.04,
              bracketTax: 50
            },
            {
              low: 3000,
              high: 100000,
              rate: 0.0475,
              bracketTax: 90
            },
            {
              low: 100000,
              high: 125000,
              rate: 0.05,
              bracketTax: 4697.5
            },
            {
              low: 125000,
              high: 150000,
              rate: 0.0525,
              bracketTax: 5947.5
            },
            {
              low: 150000,
              high: 250000,
              rate: 0.055,
              bracketTax: 7260
            },
            {
              low: 250000,
              high: null,
              rate: 0.0575,
              bracketTax: 12760
            }
          ],
          stdDeduction: 5500,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 1000,
            rate: 0.02,
            bracketTax: 0
          },
          {
            low: 1000,
            high: 2000,
            rate: 0.03,
            bracketTax: 20
          },
          {
            low: 2000,
            high: 3000,
            rate: 0.04,
            bracketTax: 50
          },
          {
            low: 3000,
            high: 150000,
            rate: 0.0475,
            bracketTax: 90
          },
          {
            low: 150000,
            high: 175000,
            rate: 0.05,
            bracketTax: 7072.5
          },
          {
            low: 175000,
            high: 225000,
            rate: 0.0525,
            bracketTax: 8322.5
          },
          {
            low: 225000,
            high: 300000,
            rate: 0.055,
            bracketTax: 10947.5
          },
          {
            low: 300000,
            high: null,
            rate: 0.0575,
            bracketTax: 15072.5
          }
        ],
        stdDeduction: 11050,
        otherDeductions: 0,
        credit: 0
      };
    case 'MA':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: null,
              rate: 0.05,
              bracketTax: 0
            }
          ],
          stdDeduction: 0,
          otherDeductions: 4400,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: null,
            rate: 0.05,
            bracketTax: 0
          }
        ],
        stdDeduction: 0,
        otherDeductions: 8800,
        credit: 0
      };
    case 'MI':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: null,
              rate: 0.0425,
              bracketTax: 0
            }
          ],
          stdDeduction: 0,
          otherDeductions: 5000,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: null,
            rate: 0.0425,
            bracketTax: 0
          }
        ],
        stdDeduction: 0,
        otherDeductions: 10000,
        credit: 0
      };
    case 'MN':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 28080,
              rate: 0.0535,
              bracketTax: 0
            },
            {
              low: 28080,
              high: 92230,
              rate: 0.068,
              bracketTax: 1502.28
            },
            {
              low: 92230,
              high: 171220,
              rate: 0.0785,
              bracketTax: 5864.48
            },
            {
              low: 171220,
              high: null,
              rate: 0.0985,
              bracketTax: 12065.2
            }
          ],
          stdDeduction: 12900,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 41050,
            rate: 0.0535,
            bracketTax: 0
          },
          {
            low: 41050,
            high: 163060,
            rate: 0.068,
            bracketTax: 2196.18
          },
          {
            low: 163060,
            high: 284810,
            rate: 0.0785,
            bracketTax: 10492.86
          },
          {
            low: 284810,
            high: null,
            rate: 0.0985,
            bracketTax: 20050.23
          }
        ],
        stdDeduction: 25800,
        otherDeductions: 0,
        credit: 0
      };
    case 'MS':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 5000,
              rate: 0,
              bracketTax: 0
            },
            {
              low: 5000,
              high: 10000,
              rate: 0.04,
              bracketTax: 0
            },
            {
              low: 10000,
              high: null,
              rate: 0.05,
              bracketTax: 200
            }
          ],
          stdDeduction: 2300,
          otherDeductions: 6000,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 5000,
            rate: 0,
            bracketTax: 0
          },
          {
            low: 5000,
            high: 10000,
            rate: 0.04,
            bracketTax: 0
          },
          {
            low: 10000,
            high: null,
            rate: 0.05,
            bracketTax: 200
          }
        ],
        stdDeduction: 4600,
        otherDeductions: 12000,
        credit: 0
      };
    case 'MO' /* */:
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 108,
              rate: 0,
              bracketTax: 0
            },
            {
              low: 108,
              high: 1088,
              rate: 0.015,
              bracketTax: 0
            },
            {
              low: 1088,
              high: 2176,
              rate: 0.02,
              bracketTax: 14.7
            },
            {
              low: 2176,
              high: 3264,
              rate: 0.025,
              bracketTax: 36.46
            },
            {
              low: 3264,
              high: 4352,
              rate: 0.03,
              bracketTax: 63.66
            },
            {
              low: 4352,
              high: 5440,
              rate: 0.035,
              bracketTax: 96.3
            },
            {
              low: 5440,
              high: 6528,
              rate: 0.04,
              bracketTax: 134.38
            },
            {
              low: 6528,
              high: 7616,
              rate: 0.045,
              bracketTax: 177.9
            },
            {
              low: 7616,
              high: 8704,
              rate: 0.05,
              bracketTax: 226.86
            },
            {
              low: 8704,
              high: null,
              rate: 0.054,
              bracketTax: 281.26
            }
          ],
          stdDeduction: 12950,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 108,
            rate: 0,
            bracketTax: 0
          },
          {
            low: 108,
            high: 1088,
            rate: 0.015,
            bracketTax: 0
          },
          {
            low: 1088,
            high: 2176,
            rate: 0.02,
            bracketTax: 14.7
          },
          {
            low: 2176,
            high: 3264,
            rate: 0.025,
            bracketTax: 36.46
          },
          {
            low: 3264,
            high: 4352,
            rate: 0.03,
            bracketTax: 63.66
          },
          {
            low: 4352,
            high: 5440,
            rate: 0.035,
            bracketTax: 96.3
          },
          {
            low: 5440,
            high: 6528,
            rate: 0.04,
            bracketTax: 134.38
          },
          {
            low: 6528,
            high: 7616,
            rate: 0.045,
            bracketTax: 177.9
          },
          {
            low: 7616,
            high: 8704,
            rate: 0.05,
            bracketTax: 226.86
          },
          {
            low: 8704,
            high: null,
            rate: 0.054,
            bracketTax: 281.26
          }
        ],
        stdDeduction: 25900,
        otherDeductions: 0,
        credit: 0
      };
    case 'MT' /* */:
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 3100,
              rate: 0.01,
              bracketTax: 0
            },
            {
              low: 3100,
              high: 5500,
              rate: 0.02,
              bracketTax: 31
            },
            {
              low: 5500,
              high: 8400,
              rate: 0.03,
              bracketTax: 79
            },
            {
              low: 8400,
              high: 11300,
              rate: 0.04,
              bracketTax: 166
            },
            {
              low: 11300,
              high: 14500,
              rate: 0.05,
              bracketTax: 282
            },
            {
              low: 14500,
              high: 18700,
              rate: 0.06,
              bracketTax: 442
            },
            {
              low: 18700,
              high: null,
              rate: 0.069,
              bracketTax: 694
            }
          ],
          stdDeduction: 7350,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 3100,
            rate: 0.01,
            bracketTax: 0
          },
          {
            low: 3100,
            high: 5500,
            rate: 0.02,
            bracketTax: 31
          },
          {
            low: 5500,
            high: 8400,
            rate: 0.03,
            bracketTax: 79
          },
          {
            low: 8400,
            high: 11300,
            rate: 0.04,
            bracketTax: 166
          },
          {
            low: 11300,
            high: 14500,
            rate: 0.05,
            bracketTax: 282
          },
          {
            low: 14500,
            high: 18700,
            rate: 0.06,
            bracketTax: 442
          },
          {
            low: 18700,
            high: null,
            rate: 0.069,
            bracketTax: 694
          }
        ],
        stdDeduction: 9580,
        otherDeductions: 5120,
        credit: 0
      };
    case 'NE':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 3440,
              rate: 0.0246,
              bracketTax: 0
            },
            {
              low: 3440,
              high: 20590,
              rate: 0.0351,
              bracketTax: 84.62
            },
            {
              low: 20590,
              high: 33180,
              rate: 0.0501,
              bracketTax: 686.59
            },
            {
              low: 33180,
              high: null,
              rate: 0.0684,
              bracketTax: 1317.35
            }
          ],
          stdDeduction: 7350,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 6860,
            rate: 0.0246,
            bracketTax: 0
          },
          {
            low: 6860,
            high: 41190,
            rate: 0.0351,
            bracketTax: 168.76
          },
          {
            low: 41190,
            high: 66360,
            rate: 0.0501,
            bracketTax: 1373.74
          },
          {
            low: 66360,
            high: null,
            rate: 0.0684,
            bracketTax: 2634.76
          }
        ],
        stdDeduction: 14700,
        otherDeductions: 0,
        credit: 0
      };
    case 'NJ':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 20000,
              rate: 0.014,
              bracketTax: 0
            },
            {
              low: 20000,
              high: 35000,
              rate: 0.0175,
              bracketTax: 280
            },
            {
              low: 35000,
              high: 40000,
              rate: 0.035,
              bracketTax: 542.5
            },
            {
              low: 40000,
              high: 75000,
              rate: 0.05525,
              bracketTax: 717.5
            },
            {
              low: 75000,
              high: 500000,
              rate: 0.0637,
              bracketTax: 2651.25
            },
            {
              low: 500000,
              high: 1000000,
              rate: 0.0897,
              bracketTax: 29723.75
            },
            {
              low: 1000000,
              high: null,
              rate: 0.1075,
              bracketTax: 74573.75
            }
          ],
          stdDeduction: 1000,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 20000,
            rate: 0.014,
            bracketTax: 0
          },
          {
            low: 20000,
            high: 50000,
            rate: 0.0175,
            bracketTax: 280
          },
          {
            low: 50000,
            high: 70000,
            rate: 0.0245,
            bracketTax: 805
          },
          {
            low: 70000,
            high: 80000,
            rate: 0.035,
            bracketTax: 1295
          },
          {
            low: 80000,
            high: 150000,
            rate: 0.05525,
            bracketTax: 1645
          },
          {
            low: 150000,
            high: 500000,
            rate: 0.0637,
            bracketTax: 5512.5
          },
          {
            low: 500000,
            high: 1000000,
            rate: 0.0897,
            bracketTax: 27807.5
          },
          {
            low: 1000000,
            high: null,
            rate: 0.1075,
            bracketTax: 72657.5
          }
        ],
        stdDeduction: 2000,
        otherDeductions: 0,
        credit: 0
      };
    case 'NM':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 5500,
              rate: 0.017,
              bracketTax: 0
            },
            {
              low: 5500,
              high: 11000,
              rate: 0.032,
              bracketTax: 93.5
            },
            {
              low: 11000,
              high: 16000,
              rate: 0.047,
              bracketTax: 269.5
            },
            {
              low: 16000,
              high: 210000,
              rate: 0.049,
              bracketTax: 504.5
            },
            {
              low: 210000,
              high: null,
              rate: 0.059,
              bracketTax: 10010.5
            }
          ],
          stdDeduction: 12950,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 8000,
            rate: 0.017,
            bracketTax: 0
          },
          {
            low: 8000,
            high: 16000,
            rate: 0.032,
            bracketTax: 136
          },
          {
            low: 16000,
            high: 24000,
            rate: 0.047,
            bracketTax: 392
          },
          {
            low: 24000,
            high: 315000,
            rate: 0.049,
            bracketTax: 768
          },
          {
            low: 315000,
            high: null,
            rate: 0.059,
            bracketTax: 15027
          }
        ],
        stdDeduction: 25900,
        otherDeductions: 0,
        credit: 0
      };
    case 'NY':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 8500,
              rate: 0.04,
              bracketTax: 0
            },
            {
              low: 8500,
              high: 11700,
              rate: 0.045,
              bracketTax: 340
            },
            {
              low: 11700,
              high: 13900,
              rate: 0.0525,
              bracketTax: 484
            },
            {
              low: 13900,
              high: 80650,
              rate: 0.0585,
              bracketTax: 599.5
            },
            {
              low: 80650,
              high: 215400,
              rate: 0.0625,
              bracketTax: 4504.4
            },
            {
              low: 215400,
              high: 1077550,
              rate: 0.0685,
              bracketTax: 12926.3
            },
            {
              low: 1077550,
              high: 5000000,
              rate: 0.0965,
              bracketTax: 71983.5
            },
            {
              low: 5000000,
              high: 25000000,
              rate: 0.103,
              bracketTax: 450500.0
            },
            {
              low: 25000000,
              high: null,
              rate: 0.109,
              bracketTax: 2510500.0
            }
          ],
          stdDeduction: 8000,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 17150,
            rate: 0.04,
            bracketTax: 0
          },
          {
            low: 17150,
            high: 23600,
            rate: 0.045,
            bracketTax: 686
          },
          {
            low: 23600,
            high: 27900,
            rate: 0.0525,
            bracketTax: 976
          },
          {
            low: 27900,
            high: 161550,
            rate: 0.0585,
            bracketTax: 1202
          },
          {
            low: 161550,
            high: 323200,
            rate: 0.0625,
            bracketTax: 9020.525
          },
          {
            low: 323200,
            high: 2155350,
            rate: 0.0685,
            bracketTax: 19123.65
          },
          {
            low: 2155350,
            high: 5000000,
            rate: 0.0965,
            bracketTax: 144625.925
          },
          {
            low: 5000000,
            high: 25000000,
            rate: 0.103,
            bracketTax: 419134.65
          },
          {
            low: 25000000,
            high: null,
            rate: 0.109,
            bracketTax: 2479134.65
          }
        ],
        stdDeduction: 16050,
        otherDeductions: 0,
        credit: 0
      };
    case 'NC':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: null,
              rate: 0.0499,
              bracketTax: 0
            }
          ],
          stdDeduction: 12750,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: null,
            rate: 0.0499,
            bracketTax: 0
          }
        ],
        stdDeduction: 25500,
        otherDeductions: 0,
        credit: 0
      };
    case 'ND':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 40125,
              rate: 0.011,
              bracketTax: 0
            },
            {
              low: 40125,
              high: 97150,
              rate: 0.0204,
              bracketTax: 441.38
            },
            {
              low: 97150,
              high: 202650,
              rate: 0.0227,
              bracketTax: 1604.68
            },
            {
              low: 202650,
              high: 440600,
              rate: 0.0264,
              bracketTax: 3999.53
            },
            {
              low: 440600,
              high: null,
              rate: 0.029,
              bracketTax: 10281.41
            }
          ],
          stdDeduction: 12550,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 67050,
            rate: 0.011,
            bracketTax: 0
          },
          {
            low: 67050,
            high: 161950,
            rate: 0.0204,
            bracketTax: 737.55
          },
          {
            low: 161950,
            high: 246700,
            rate: 0.0227,
            bracketTax: 2673.51
          },
          {
            low: 246700,
            high: 440600,
            rate: 0.0264,
            bracketTax: 4597.34
          },
          {
            low: 440600,
            high: null,
            rate: 0.029,
            bracketTax: 9716.3
          }
        ],
        stdDeduction: 25100,
        otherDeductions: 0,
        credit: 0
      };
    case 'OH':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 25000,
              rate: 0,
              bracketTax: 0
            },
            {
              low: 25000,
              high: 44250,
              rate: 0.02765,
              bracketTax: 0
            },
            {
              low: 44250,
              high: 88450,
              rate: 0.03226,
              bracketTax: 532.26
            },
            {
              low: 88450,
              high: 110650,
              rate: 0.03688,
              bracketTax: 1958.15
            },
            {
              low: 110650,
              high: null,
              rate: 0.0399,
              bracketTax: 2776.89
            }
          ],
          stdDeduction: 2400,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 25000,
            rate: 0,
            bracketTax: 0
          },
          {
            low: 25000,
            high: 44250,
            rate: 0.02765,
            bracketTax: 0
          },
          {
            low: 44250,
            high: 88450,
            rate: 0.03226,
            bracketTax: 532.26
          },
          {
            low: 88450,
            high: 110650,
            rate: 0.03688,
            bracketTax: 1958.15
          },
          {
            low: 110650,
            high: null,
            rate: 0.0399,
            bracketTax: 2776.89
          }
        ],
        stdDeduction: 4800,
        otherDeductions: 0,
        credit: 0
      };
    case 'OK':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 1000,
              rate: 0.0025,
              bracketTax: 0
            },
            {
              low: 1000,
              high: 2500,
              rate: 0.0075,
              bracketTax: 2.5
            },
            {
              low: 2500,
              high: 3750,
              rate: 0.0175,
              bracketTax: 13.75
            },
            {
              low: 3750,
              high: 4900,
              rate: 0.0275,
              bracketTax: 35.625
            },
            {
              low: 4900,
              high: 7200,
              rate: 0.0375,
              bracketTax: 67.25
            },
            {
              low: 7200,
              high: null,
              rate: 0.0475,
              bracketTax: 153.5
            }
          ],
          stdDeduction: 6350,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 2000,
            rate: 0.0025,
            bracketTax: 0
          },
          {
            low: 2000,
            high: 5000,
            rate: 0.0075,
            bracketTax: 5
          },
          {
            low: 5000,
            high: 7500,
            rate: 0.0175,
            bracketTax: 27.5
          },
          {
            low: 7500,
            high: 9800,
            rate: 0.0275,
            bracketTax: 71.25
          },
          {
            low: 9800,
            high: 12200,
            rate: 0.0375,
            bracketTax: 134.5
          },
          {
            low: 12200,
            high: null,
            rate: 0.0475,
            bracketTax: 224.5
          }
        ],
        stdDeduction: 12700,
        otherDeductions: 0,
        credit: 0
      };
    case 'OR' /* Check out personal excemptions */:
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 3650,
              rate: 0.0475,
              bracketTax: 0
            },
            {
              low: 3650,
              high: 50000,
              rate: 0.0675,
              bracketTax: 173.38
            },
            {
              low: 50000,
              high: 125000,
              rate: 0.0875,
              bracketTax: 3302
            },
            {
              low: 125000,
              high: null,
              rate: 0.099,
              bracketTax: 9864.5
            }
          ],
          stdDeduction: 2640,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 7300,
            rate: 0.0475,
            bracketTax: 0
          },
          {
            low: 7300,
            high: 50000,
            rate: 0.0675,
            bracketTax: 346.75
          },
          {
            low: 50000,
            high: 250000,
            rate: 0.0875,
            bracketTax: 3229
          },
          {
            low: 250000,
            high: null,
            rate: 0.099,
            bracketTax: 20729
          }
        ],
        stdDeduction: 5280,
        otherDeductions: 0,
        credit: 0
      };
    case 'PA':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: null,
              rate: 0.0307,
              bracketTax: 0
            }
          ],
          stdDeduction: 0,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: null,
            rate: 0.0307,
            bracketTax: 0
          }
        ],
        stdDeduction: 0,
        otherDeductions: 0,
        credit: 0
      };
    case 'RI':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 68200,
              rate: 0.0375,
              bracketTax: 0
            },
            {
              low: 68200,
              high: 155050,
              rate: 0.0475,
              bracketTax: 2557.5
            },
            {
              low: 155050,
              high: null,
              rate: 0.0599,
              bracketTax: 6682.875
            }
          ],
          stdDeduction: 13650,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 68200,
            rate: 0.0375,
            bracketTax: 0
          },
          {
            low: 68200,
            high: 155050,
            rate: 0.0475,
            bracketTax: 2557.5
          },
          {
            low: 155050,
            high: null,
            rate: 0.0599,
            bracketTax: 6682.875
          }
        ],
        stdDeduction: 27300,
        otherDeductions: 0,
        credit: 0
      };
    case 'SC':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 3200,
              rate: 0,
              bracketTax: 0
            },
            {
              low: 3200,
              high: 6410,
              rate: 0.03,
              bracketTax: 0
            },
            {
              low: 6410,
              high: 9620,
              rate: 0.04,
              bracketTax: 96.3
            },
            {
              low: 9620,
              high: 12820,
              rate: 0.05,
              bracketTax: 224.7
            },
            {
              low: 12820,
              high: 16040,
              rate: 0.06,
              bracketTax: 384.7
            },
            {
              low: 16040,
              high: null,
              rate: 0.07,
              bracketTax: 577.9
            }
          ],
          stdDeduction: 12950,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 3200,
            rate: 0,
            bracketTax: 0
          },
          {
            low: 3200,
            high: 6410,
            rate: 0.03,
            bracketTax: 0
          },
          {
            low: 6410,
            high: 9620,
            rate: 0.04,
            bracketTax: 96.3
          },
          {
            low: 9620,
            high: 12820,
            rate: 0.05,
            bracketTax: 224.7
          },
          {
            low: 12820,
            high: 16040,
            rate: 0.06,
            bracketTax: 384.7
          },
          {
            low: 16040,
            high: null,
            rate: 0.07,
            bracketTax: 577.9
          }
        ],
        stdDeduction: 25900,
        otherDeductions: 0,
        credit: 0
      };
    case 'UT':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: null,
              rate: 0.0495,
              bracketTax: 0
            }
          ],
          stdDeduction: 579,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: null,
            rate: 0.0495,
            bracketTax: 0
          }
        ],
        stdDeduction: 2600,
        otherDeductions: 0,
        credit: 0
      };
    case 'VT':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 40950,
              rate: 0.0335,
              bracketTax: 0
            },
            {
              low: 40950,
              high: 99200,
              rate: 0.066,
              bracketTax: 1371.82
            },
            {
              low: 99200,
              high: 206950,
              rate: 0.076,
              bracketTax: 5216.32
            },
            {
              low: 206950,
              high: null,
              rate: 0.0875,
              bracketTax: 13405.33
            }
          ],
          stdDeduction: 10700,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 68400,
            rate: 0.0335,
            bracketTax: 0
          },
          {
            low: 68400,
            high: 165350,
            rate: 0.066,
            bracketTax: 2291.4
          },
          {
            low: 165350,
            high: 251950,
            rate: 0.076,
            bracketTax: 8690.1
          },
          {
            low: 251950,
            high: null,
            rate: 0.0875,
            bracketTax: 15271.7
          }
        ],
        stdDeduction: 21400,
        otherDeductions: 0,
        credit: 0
      };
    case 'VA':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 3000,
              rate: 0.02,
              bracketTax: 0
            },
            {
              low: 3000,
              high: 5000,
              rate: 0.03,
              bracketTax: 60
            },
            {
              low: 5000,
              high: 17000,
              rate: 0.05,
              bracketTax: 120
            },
            {
              low: 17000,
              high: null,
              rate: 0.0575,
              bracketTax: 720
            }
          ],
          stdDeduction: 5430,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 3000,
            rate: 0.02,
            bracketTax: 0
          },
          {
            low: 3000,
            high: 5000,
            rate: 0.03,
            bracketTax: 60
          },
          {
            low: 5000,
            high: 17000,
            rate: 0.05,
            bracketTax: 120
          },
          {
            low: 17000,
            high: null,
            rate: 0.0575,
            bracketTax: 720
          }
        ],
        stdDeduction: 10860,
        otherDeductions: 0,
        credit: 0
      };
    case 'WV':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 10000,
              rate: 0.03,
              bracketTax: 0
            },
            {
              low: 10000,
              high: 25000,
              rate: 0.04,
              bracketTax: 300
            },
            {
              low: 25000,
              high: 40000,
              rate: 0.045,
              bracketTax: 900
            },
            {
              low: 40000,
              high: 60000,
              rate: 0.06,
              bracketTax: 1575
            },
            {
              low: 60000,
              high: null,
              rate: 0.065,
              bracketTax: 2775
            }
          ],
          stdDeduction: 2000,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 10000,
            rate: 0.03,
            bracketTax: 0
          },
          {
            low: 10000,
            high: 25000,
            rate: 0.04,
            bracketTax: 300
          },
          {
            low: 25000,
            high: 40000,
            rate: 0.045,
            bracketTax: 900
          },
          {
            low: 40000,
            high: 60000,
            rate: 0.06,
            bracketTax: 1575
          },
          {
            low: 60000,
            high: null,
            rate: 0.065,
            bracketTax: 2775
          }
        ],
        stdDeduction: 4000,
        otherDeductions: 0,
        credit: 0
      };
    case 'WI' /* Check out phase out for single and married for stdDeduction and Excemptions */:
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 12760,
              rate: 0.0354,
              bracketTax: 0
            },
            {
              low: 12760,
              high: 25520,
              rate: 0.0465,
              bracketTax: 451.7
            },
            {
              low: 25520,
              high: 280950,
              rate: 0.053,
              bracketTax: 1045.04
            },
            {
              low: 280950,
              high: null,
              rate: 0.0765,
              bracketTax: 14582.83
            }
          ],
          stdDeduction: 11050,
          otherDeductions: 0,
          credit: 0,
          excemptions: {
            rate: -0.1125,
            offset: 12300,
            excessLow: 16000,
            excessHigh: 108000,
            personalE: 700
          }
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 17010,
            rate: 0.0354,
            bracketTax: 0
          },
          {
            low: 17010,
            high: 34030,
            rate: 0.0465,
            bracketTax: 602.15
          },
          {
            low: 34030,
            high: 374600,
            rate: 0.053,
            bracketTax: 1393.58
          },
          {
            low: 374600,
            high: null,
            rate: 0.0765,
            bracketTax: 19443.79
          }
        ],
        stdDeduction: 20000,
        otherDeductions: 0,
        credit: 0,
        excemptions: {
          rate: -0.1845,
          offset: 23300,
          excessLow: 23000,
          excessHigh: 126500,
          personalE: 700
        }
      };
    case 'DC':
      if (isSingle) {
        return {
          brackets: [
            {
              low: 0,
              high: 10000,
              rate: 0.04,
              bracketTax: 0
            },
            {
              low: 10000,
              high: 40000,
              rate: 0.06,
              bracketTax: 400
            },
            {
              low: 40000,
              high: 60000,
              rate: 0.065,
              bracketTax: 2200
            },
            {
              low: 60000,
              high: 250000,
              rate: 0.085,
              bracketTax: 3500
            },
            {
              low: 250000,
              high: 500000,
              rate: 0.0925,
              bracketTax: 19650
            },
            {
              low: 500000,
              high: 1000000,
              rate: 0.0975,
              bracketTax: 42775
            },
            {
              low: 1000000,
              high: null,
              rate: 0.1075,
              bracketTax: 91525
            }
          ],
          stdDeduction: 12950,
          otherDeductions: 0,
          credit: 0
        };
      }
      return {
        brackets: [
          {
            low: 0,
            high: 10000,
            rate: 0.04,
            bracketTax: 0
          },
          {
            low: 10000,
            high: 40000,
            rate: 0.06,
            bracketTax: 400
          },
          {
            low: 40000,
            high: 60000,
            rate: 0.065,
            bracketTax: 2200
          },
          {
            low: 60000,
            high: 250000,
            rate: 0.085,
            bracketTax: 3500
          },
          {
            low: 250000,
            high: 500000,
            rate: 0.0925,
            bracketTax: 19650
          },
          {
            low: 500000,
            high: 1000000,
            rate: 0.0975,
            bracketTax: 42775
          },
          {
            low: 1000000,
            high: null,
            rate: 0.1075,
            bracketTax: 91525
          }
        ],
        stdDeduction: 25900,
        otherDeductions: 0,
        credit: 0
      };
    default:
      return [];
  }
};

const calculateStateTax = (pay_rate, stateBrackets, stateId) => {
  let income = pay_rate;

  /* Punctual exceptions for some states */
  switch (stateId) {
    case 'AZ':
      income = pay_rate - stateBrackets.stdDeduction;
      if (income > stateBrackets.excemptions.excessIncome) {
        return Math.round(
          (income - stateBrackets.excemptions.excessIncome) * stateBrackets.excemptions.excessRate +
            stateBrackets.excemptions.bracketTax +
            (income - stateBrackets.excemptions.excessIncome) *
              stateBrackets.excemptions.surchargeRate
        );
      }
      break;
    case 'CT':
      if (pay_rate >= 0 && pay_rate <= stateBrackets.excemptions.lowend) {
        income = pay_rate - stateBrackets.stdDeduction[0];
        break;
      } else if (
        pay_rate > stateBrackets.excemptions.lowend &&
        pay_rate <= stateBrackets.excemptions.highend
      ) {
        income =
          pay_rate -
          stateBrackets.stdDeduction[
            Math.ceil(
              (pay_rate - stateBrackets.excemptions.lowend) / stateBrackets.excemptions.step
            )
          ];
        break;
      }
      break;
    case 'WI':
      if (
        income >= stateBrackets.excemptions.excessLow &&
        income <= stateBrackets.excemptions.excessHigh
      ) {
        income =
          pay_rate - (income * stateBrackets.excemptions.rate + stateBrackets.excemptions.offset);
        break;
      }
      if (income > stateBrackets.excemptions.excessHigh) {
        income -= stateBrackets.excemptions.personalE;
        break;
      }
      income = pay_rate - stateBrackets.stdDeduction;
      break;
    default:
      income = pay_rate - stateBrackets.stdDeduction;
  }

  const brackets = stateBrackets.brackets;
  const maxItem = brackets[brackets.length - 1];
  if (income > maxItem.low) {
    income = income - stateBrackets.otherDeductions;
  }
  if (income <= 0) return 0;
  if (income > maxItem.low) {
    return Math.round(
      (income - maxItem.low) * maxItem.rate + maxItem.bracketTax - stateBrackets.credit
    );
  }
  for (let i = 0; i < brackets.length; i++) {
    let bracket = brackets[i];
    if (income > bracket.low && income <= bracket.high) {
      let res = Math.round(
        (income - bracket.low) * bracket.rate + bracket.bracketTax - stateBrackets.credit
      );
      return res > 0 ? res : 0;
    }
  }
  return 0;
};

const getState = (pay_rate, filing_status = 'single', stateId = 'AL') => {
  if (
    stateId === 'AK' ||
    stateId === 'FL' ||
    stateId === 'FM' ||
    stateId === 'NV' ||
    stateId === 'NH' ||
    stateId === 'SD' ||
    stateId === 'TN' ||
    stateId === 'TX' ||
    stateId === 'WA' ||
    stateId === 'WY'
  )
    return null;
  return calculateStateTax(pay_rate, getStateBrackets(filing_status, stateId), stateId);
};

export default getState;
