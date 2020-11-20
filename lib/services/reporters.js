const reporters = ['Riley Parker', 'Caitlin Ryan', 'Tulio Trivino', 'Raymond Rambert', 'Lily Wong', 'Marcello Rubini', 'Vicente Chambon', 'Ford Prefect', 'Rita Skeeter', 'Ted Baxter', 'Murphy Brown', 'Bryan Denton', 'Charles Foster Kane', 'Trevor Newsworthy', 'April O’Neil', 'Libby Kennedy', 'Brooke Bandenberg', 'Karla Kolumna', 'Juan Carlos Bodoque', 'Georges Duroy', 'Ulysse Merou', 'Joseph Rouletabille', 'Meiko Kurita', 'Sarah Jane Smith', 'Amy Amanda Allen', 'Larry Appleton', 'Tally Atwater', 'Matt Bai', 'Billy Batson', 'Howard Beale', 'Maddy Bowen', 'Kent Brockman', 'Carrie Bradshaw', 'Clint Buchanan', 'Walter Burns', 'Michelle Capra', 'Snapper Carr', 'Tess Mercer', 'Walter Wichita Garrett', 'Rory Gilmore', 'Tom Jumbo-Gumbo', 'Clark Kent', 'Kit Kittredge', 'William Miller', 'Les Nessman', 'Mic Pappas', 'Miranda Priestly', 'Jack Ryder', 'Andrea Sachs', 'Diane Simmons', 'Chloe Talbot', 'Vicki Vale', 'Linda van Schoonhoven', 'Herb Welch', 'Perry White', 'Kat Grant'];

const getRandomReporter = () => {
  return reporters[Math.floor(Math.random() * reporters.length)];
};

module.exports = getRandomReporter;
