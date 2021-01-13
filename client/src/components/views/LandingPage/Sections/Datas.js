const continents = [
  {
    _id: 1,
    name: "Africa",
  },
  {
    _id: 2,
    name: "Europe",
  },
  {
    _id: 3,
    name: "Asia",
  },
  {
    _id: 4,
    name: "North America",
  },
  {
    _id: 5,
    name: "South America",
  },
  {
    _id: 6,
    name: "Australia",
  },
];

const price = [
  {
    _id: 0,
    name: "All",
    array: [],
  },
  {
    _id: 1,
    name: "₩0 to ₩199,000",
    array: [0, 199000],
  },
  {
    _id: 2,
    name: "₩200,000 to ₩249,000",
    array: [200000, 249000],
  },
  {
    _id: 3,
    name: "₩250,000 to ₩299,000",
    array: [250000, 299000],
  },
  {
    _id: 4,
    name: "₩300,000 to ₩349,000",
    array: [300000, 349000],
  },
  {
    _id: 5,
    name: "₩More than ₩350,000",
    array: [350000, 150000000],
  },
];
export { continents, price };
