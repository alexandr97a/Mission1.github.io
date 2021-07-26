const express = require('express');
const app = express();

const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser');

sequelize.sync();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const {
    Customer,
    Table,
    Sequelize: { Op }
  } = require('./models');
sequelize.query('SET NAMES utf8;');

// 이후 추가할 코드 영역

app.get('/get/table', (req, res) => {
    Table.findAll()
     .then( result => { res.send(result) })
     .catch( err => { throw err })
 }) 

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})