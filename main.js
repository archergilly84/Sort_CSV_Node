//Pars CSV and sort First name, followed by last name

const csv = require('csv-parser');
const fs = require('fs');
const j2c = require('json-2-csv');

const file = './People.csv';
const rows = [];

fs.createReadStream(file)
    .pipe(csv())
    .on('data', (row) => rows.push(row))
    .on('end', () => {
        rows.sort( (a,b) => {
            let obj1 = a["First Name"].toLowerCase();
            let obj2 = a["Last Name"].toLowerCase();
            let obj3 = b["First Name"].toLowerCase();
            let obj4 = b["Last Name"].toLowerCase();

            if(obj1 < obj3) return -1;
            if(obj1 > obj3) return 1;            

            if(obj2 > obj4) return 1;
            if(obj2 < obj4) return -1;

            return 0;

            
        });
        j2c.json2csvAsync(rows).then(csv => {
            fs.writeFileSync('People_Sorted.csv', csv);
        }).catch(err => {
            console.error(err)
        })
    })



    