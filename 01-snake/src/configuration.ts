interface Configuration {
  maxLevel: number;
  defaultSpeed: number;
  nbCellsX: number;
  nbCellsY: number;
  appleAmount: number;
}

const configuration: Configuration = {
  maxLevel: 10,
  defaultSpeed: 100,
  nbCellsX: 45,
  nbCellsY: 25,
  appleAmount: 5
};

export default configuration;
