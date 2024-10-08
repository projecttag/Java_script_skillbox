// Обязательная часть задания
// В этом задании использовали тернарный оператор :  условие ? выражение1 : выражение2;

let user1={
  name: 'Игорь',
  age: 17
}

let user2={
  name: 'Оля',
  age: 21
}

function getOlderUser(userOne, userTwo){
  return userOne.age > userTwo.age ? userOne.name : userTwo.name; // команда return используется перед тернарным оператором
}

let result = getOlderUser(user1, user2)
console.log('Старший пользователь:',result);

/*

// без тернароного оператора можно решить так:

let user1={
  name: 'Игорь',
  age: 17
}

let user2={
  name: 'Оля',
  age: 21
}

function getOlderUser(userOne, userTwo) {
  if (userOne.age > userTwo.age) {
    return userOne.name;
  } else {
    return userTwo.name; // команда ретерн используется после оператора иф
  }
}

let result = getOlderUser(user1, user2)
console.log('Старший пользователь:',result);

*/

// // Не обязательная часть задания



let allUsers = [
  {
    name: 'Валя',
    age: 11
  },
  {
    name: 'Таня',
    age: 24
  },
  {
    name: 'Рома',
    age: 21
  },
  {
    name: 'Надя',
    age: 34
  },
  {
    name: 'Антон',
    age: 7
  }
];

function getOlderUserArray(usersArray) {
  let oldestUser = usersArray[0]; // Начинаем с первого пользователя

  for (let i = 1; i < usersArray.length; i++) {
    if (usersArray[i].age > oldestUser.age) {
      oldestUser = usersArray[i]; // Если найден пользователь старше, обновляем переменную
    }
  }

  return oldestUser.name; // Возвращаем имя самого старшего пользователя
}

let result2 = getOlderUserArray(allUsers);
console.log('Старший пользователь:', result2);
