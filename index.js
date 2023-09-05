const express = require('express')
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const data = {
  select : function () {
    return JSON.parse(fs.readFileSync('./test.json'))
  },
  insert: function (newObj) {
    const jsonData = data.select();
    let newData = [...jsonData, { id: jsonData.length + 1, ...newObj }]
    // ... => 한꺼풀 벗긴다는 의미로 생각하면 편할듯
    fs.writeFileSync('./test.json', JSON.stringify(newData));
    return newData;
  },
  update: function () { },
  delete: function () { }

}




app.get('/abc', function (req, res) {
/*   const jsonData = fs.readFileSync('./test.json');
  res.send( JSON.parse(jsonData) ) */
  res.send(data.select());
})

app.delete('/abc/:id', function (req, res) {
  const jsonData = data.select();
  // const data = JSON.parse(jsonData);
  const {id} = req.params;
  const delData = jsonData.filter( n => n.id != id)

  fs.writeFileSync('./test.json', JSON.stringify(delData));

  res.send(delData)
})

app.post('/insert', function (req, res) {

/*   console.log(req.body)
  const jsonData = JSON.parse(fs.readFileSync('./test.json'));
  let data = [...jsonData, { id: jsonData.length+1 , ...req.body }]
  // ... => 한꺼풀 벗긴다는 의미로 생각하면 편할듯
  fs.writeFileSync('./test.json', JSON.stringify(data)); */
  res.send(data.insert(req.body));
})
app.listen(3000)