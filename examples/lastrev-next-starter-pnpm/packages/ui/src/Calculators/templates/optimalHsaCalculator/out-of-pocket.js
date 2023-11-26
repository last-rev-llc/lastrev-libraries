export const sliderCalculator = [
  {
    title: 'Low',
    description: 'You only visit the doctor for routine check ups',
    price: '300',
    priceDescription: 'Estimated annual expenses',
    normalColors: ['white', '#7D70C0', '#7D70C0', '#7D70C0'],
    activeColors: ['#34A69D', '#7D70C0', '#7D70C0', '#7D70C0']
  },
  {
    title: 'Average',
    description: 'You visit the doctor a few times a year and have a few prescriptions',
    price: '1,750',
    priceDescription: 'Estimated annual expenses',
    normalColors: ['white', 'white', '#7D70C0', '#7D70C0'],
    activeColors: ['#34A69D', 'white', '#9DC5D8', '#9DC5D8']
  },
  {
    title: 'High',
    description: 'You have a chronic condition or expect a major procedure',
    price: '3,500',
    priceDescription: 'Estimated annual expenses',
    normalColors: ['white', 'white', 'white', '#7D70C0'],
    activeColors: ['#34A69D', '#34A69D', '#34A69D', '#9DC5D8']
  },
  {
    title: 'Custom',
    description: 'Enter your expected annual out-of-pocket healthcare costs',
    input: true,
    priceDescription: 'Enter a custom estimate',
    normalColors: ['white', 'white', 'white', 'white'],
    activeColors: ['#34A69D', 'white', '#34A69D', '#34A69D']
  }
];
