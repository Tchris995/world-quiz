import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const app = express();
const port = 3001;

// const db = new pg.Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'world',
//   password: 'Tallestman1995.',
//   port: 3000,
// });

// db.connect();

let quiz
  = [
   { country: "France", capital: "Paris" },
   { country: "United Kingdom", capital: "London" },
   { country: "United States of America", capital: "New York" },
   { id: 1, country: 'Afghanistan', capital: 'Kabul' },
  { id: 2, country: 'Aland Islands', capital: 'Mariehamn' },
  { id: 3, country: 'Albania', capital: 'Tirana' },
  { id: 5, country: 'American Samoa', capital: 'Pago Pago' },
  { id: 6, country: 'Andorra', capital: 'Andorra la Vella' },
  { id: 7, country: 'Angola', capital: 'Luanda' },
  { id: 8, country: 'Anguilla', capital: 'The Valley' },
  { id: 9, country: 'Antarctica', capital: null },
  { id: 10, country: 'Antigua And Barbuda', capital: "St. John's" },
  { id: 11, country: 'Argentina', capital: 'Buenos Aires' },
  { id: 12, country: 'Armenia', capital: 'Yerevan' },
  { id: 13, country: 'Aruba', capital: 'Oranjestad' },
  { id: 14, country: 'Australia', capital: 'Canberra' },
  { id: 15, country: 'Austria', capital: 'Vienna' },
  { id: 16, country: 'Azerbaijan', capital: 'Baku' },
  { id: 18, country: 'Bahrain', capital: 'Manama' },
  { id: 19, country: 'Bangladesh', capital: 'Dhaka' },
  { id: 20, country: 'Barbados', capital: 'Bridgetown' },
  { id: 21, country: 'Belarus', capital: 'Minsk' },
  { id: 22, country: 'Belgium', capital: 'Brussels' },
  { id: 23, country: 'Belize', capital: 'Belmopan' },
  { id: 24, country: 'Benin', capital: 'Porto-Novo' },
  { id: 25, country: 'Bermuda', capital: 'Hamilton' },
  { id: 26, country: 'Bhutan', capital: 'Thimphu' },
  { id: 27, country: 'Bolivia', capital: 'Sucre' },
  {
    id: 155,
    country: 'Bonaire, Sint Eustatius and Saba',
    capital: 'Kralendijk'
  },
  { id: 28, country: 'Bosnia and Herzegovina', capital: 'Sarajevo' },
  { id: 29, country: 'Botswana', capital: 'Gaborone' },
  { id: 30, country: 'Bouvet Island', capital: null },
  { id: 31, country: 'Brazil', capital: 'Brasilia' },
  {
    id: 32,
    country: 'British Indian Ocean Territory',
    capital: 'Diego Garcia'
  },
  { id: 33, country: 'Brunei', capital: 'Bandar Seri Begawan' },
  { id: 34, country: 'Bulgaria', capital: 'Sofia' },
  { id: 35, country: 'Burkina Faso', capital: 'Ouagadougou' },
  { id: 36, country: 'Burundi', capital: 'Bujumbura' },
  { id: 37, country: 'Cambodia', capital: 'Phnom Penh' },
  { id: 38, country: 'Cameroon', capital: 'Yaounde' },
  { id: 39, country: 'Canada', capital: 'Ottawa' },
  { id: 40, country: 'Cape Verde', capital: 'Praia' },
  { id: 41, country: 'Cayman Islands', capital: 'George Town' },
  { id: 42, country: 'Central African Republic', capital: 'Bangui' },
  { id: 43, country: 'Chad', capital: "N'Djamena" },
  { id: 44, country: 'Chile', capital: 'Santiago' },
  { id: 45, country: 'China', capital: 'Beijing' },
  { id: 46, country: 'Christmas Island', capital: 'Flying Fish Cove' },
  {
    id: 47,
    country: 'Cocos (Keeling) Islands',
    capital: 'West Island'
  },
  { id: 48, country: 'Colombia', capital: 'Bogotá' },
  { id: 49, country: 'Comoros', capital: 'Moroni' },
  { id: 50, country: 'Congo', capital: 'Brazzaville' },
  { id: 52, country: 'Cook Islands', capital: 'Avarua' },
  { id: 53, country: 'Costa Rica', capital: 'San Jose' },
  {
    id: 54,
    country: "Cote D'Ivoire (Ivory Coast)",
    capital: 'Yamoussoukro'
  },
  { id: 55, country: 'Croatia', capital: 'Zagreb' },
  { id: 56, country: 'Cuba', capital: 'Havana' },
  { id: 249, country: 'Curaçao', capital: 'Willemstad' },
  { id: 57, country: 'Cyprus', capital: 'Nicosia' },
  { id: 58, country: 'Czech Republic', capital: 'Prague' },
  {
    id: 51,
    country: 'Democratic Republic of the Congo',
    capital: 'Kinshasa'
  },
  { id: 59, country: 'Denmark', capital: 'Copenhagen' },
  { id: 60, country: 'Djibouti', capital: 'Djibouti' },
  { id: 61, country: 'Dominica', capital: 'Roseau' },
  { id: 62, country: 'Dominican Republic', capital: 'Santo Domingo' },
  { id: 63, country: 'East Timor', capital: 'Dili' },
  { id: 64, country: 'Ecuador', capital: 'Quito' },
  { id: 65, country: 'Egypt', capital: 'Cairo' },
  { id: 66, country: 'El Salvador', capital: 'San Salvador' },
  { id: 67, country: 'Equatorial Guinea', capital: 'Malabo' },
  { id: 68, country: 'Eritrea', capital: 'Asmara' },
  { id: 69, country: 'Estonia', capital: 'Tallinn' },
  { id: 70, country: 'Ethiopia', capital: 'Addis Ababa' },
  { id: 71, country: 'Falkland Islands', capital: 'Stanley' },
  { id: 72, country: 'Faroe Islands', capital: 'Torshavn' },
  { id: 73, country: 'Fiji Islands', capital: 'Suva' },
  { id: 74, country: 'Finland', capital: 'Helsinki' },
  { id: 75, country: 'France', capital: 'Paris' },
  { id: 76, country: 'French Guiana', capital: 'Cayenne' },
  { id: 77, country: 'French Polynesia', capital: 'Papeete' },
  {
    id: 78,
    country: 'French Southern Territories',
    capital: 'Port-aux-Francais'
  },
  { id: 79, country: 'Gabon', capital: 'Libreville' },
  { id: 80, country: 'Gambia The', capital: 'Banjul' },
  { id: 81, country: 'Georgia', capital: 'Tbilisi' },
  { id: 82, country: 'Germany', capital: 'Berlin' },
  { id: 83, country: 'Ghana', capital: 'Accra' },
  { id: 84, country: 'Gibraltar', capital: 'Gibraltar' },
  { id: 85, country: 'Greece', capital: 'Athens' },
  { id: 86, country: 'Greenland', capital: 'Nuuk' },
  { id: 87, country: 'Grenada', capital: "St. George's" },
  { id: 88, country: 'Guadeloupe', capital: 'Basse-Terre' },
  { id: 89, country: 'Guam', capital: 'Hagatna' },
  { id: 90, country: 'Guatemala', capital: 'Guatemala City' }
 ];


// db.query('SELECT * FROM capitals', (err, res)=>{
//   if(err){
//     console.log(err.stack);
    
//   }else{
//     quiz = res.rows;
//     // console.log(quiz);
    
//   }
//   // db.end();
// });

let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];

  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
