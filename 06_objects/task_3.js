let objects = [
  { name: 'Василий', surname: 'Васильев' },
  { name: 'Иван', surname: 'Иванов' },
  { name: 'Пётр', surname: 'Петров' }
];


function filter(arr, prop, value) {
  return arr.filter(function(obj) {
    return obj[prop] === value;
  });
}

let result = filter(objects, 'name', 'Иван');
console.log(result);
