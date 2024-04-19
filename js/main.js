class Quiz
{
   constructor(type, questions, results)
   {
       //Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
       this.type = type;
 
       //Массив с вопросами
       this.questions = questions;
 
       //Массив с возможными результатами
       this.results = results;
 
       //Количество набранных очков
       this.score = 0;
 
       //Номер результата из массива
       this.result = 0;
 
       //Номер текущего вопроса
       this.current = 0;
   }
 
   Click(index)
   {
       //Добавляем очки
       let value = this.questions[this.current].Click(index);
       this.score += value;
 
       let correct = -1;
 
       //Если было добавлено хотя бы одно очко, то считаем, что ответ верный
       if(value >= 1)
       {
           correct = index;
       }
       else
       {
           //Иначе ищем, какой ответ может быть правильным
           for(let i = 0; i < this.questions[this.current].answers.length; i++)
           {
               if(this.questions[this.current].answers[i].value >= 1)
               {
                   correct = i;
                   break;
               }
           }
       }
 
       this.Next();
 
       return correct;
   }
 
   //Переход к следующему вопросу
   Next()
   {
       this.current++;
      
       if(this.current >= this.questions.length)
       {
           this.End();
       }
   }
 
   //Если вопросы кончились, этот метод проверит, какой результат получил пользователь
   End()
   {
       for(let i = 0; i < this.results.length; i++)
       {
           if(this.results[i].Check(this.score))
           {
               this.result = i;
           }
       }
   }
}
 
//Класс, представляющий вопрос
class Question
{
   constructor(text, answers)
   {
       this.text = text;
       this.answers = answers;
   }
 
   Click(index)
   {
       return this.answers[index].value;
   }
}
 
//Класс, представляющий ответ
class Answer
{
   constructor(text, value)
   {
       this.text = text;
       this.value = value;
   }
}
 
//Класс, представляющий результат
class Result
{
   constructor(text, value)
   {
       this.text = text;
       this.value = value;
   }
 
   //Этот метод проверяет, достаточно ли очков набрал пользователь
   Check(value)
   {
       if(this.value <= value)
       {
           return true;
       }
       else
       {
           return false;
       }
   }
}



const results =
[
   new Result("Вам многому нужно научиться", 0),
   new Result("Вы уже неплохо разбираетесь", 2),
   new Result("Ваш уровень выше среднего", 4),
   new Result("Вы в совершенстве знаете тему", 6)
];
 
//Массив с вопросами
const questions =
[
    new Question("Сколько бит памяти занимает примитивный тип данных int?",
    [
        new Answer("4", 0),
        new Answer("32", 1),
        new Answer("16", 0),
        new Answer("64", 0)
    ]),
    new Question("Какой паттерн программирования реализован в классе String?",
    [
        new Answer("strategy pattern", 1),
        new Answer("extend pattern", 0),
        new Answer("blding pattern", 0),
        new Answer("source pattern", 0)
    ]),
    new Question("Какой коллекции в языке программирования Java не существует?",
    [
        new Answer("Map ", 0),
        new Answer("Trie", 1),
        new Answer("List", 0),
        new Answer("Set", 0)
    ]),
    new Question("Чем класс StringBuilder отличается от StringBuffer?",
    [
        new Answer("Не знаю", 0),
        new Answer("Потокобезопасность", 1),
        new Answer("В системе", 0),
        new Answer("Нету различия ", 0)
    ]),
    new Question("В каком виде памяти хранятся ссылки на объекты?",
    [
        new Answer("В куче", 0),
        new Answer("В стеке", 1),
        new Answer("В регистрах процессора.", 0),
        new Answer("В файловой системе", 0)
    ]),
    new Question("Сколько бит памяти занимает примитивный тип данных boolean?",
    [
        new Answer("1 бит", 1),
        new Answer("4 бита", 0),
        new Answer("2 бита", 0),
        new Answer("16 бит", 0)
    ]),
    new Question("Что делает оператор new в Java?",
    [
        new Answer("Создает копию существующего объекта", 0),
        new Answer("Удаляет объект из памяти", 0),
        new Answer("Выделяет память для нового объекта и вызывает его конструктор", 1),
        new Answer("Определяет размер объекта в памяти", 0)
    ]),
    new Question("Укажите правильный набор свойств, присущих классу.",
    [
        new Answer("Абстракция, Компонентность, Декомпозиция", 0),
        new Answer("Полиморфизм, Перегрузка, Переопределение", 0),
        new Answer("Продление, Преобразование, Преимущество", 0),
        new Answer("Инкапсуляция, Наследование, Полиморфизм", 1)
    ]),
    new Question("Какие модификаторы доступа есть в Java?",
    [
        new Answer("private, default, protected, public ", 1),
        new Answer("secure", 0),
        new Answer("friendly", 0),
        new Answer("inner", 0)
    ]),
    new Question("Чем интерфейс отличается от абстрактного класса?",
    [
        new Answer("Абстрактный класс может содержать как абстрактные методы (без реализации), так и обычные методы с реализацией.", 1),
        new Answer("Интерфейс не имеет реализации методов, а абстрактный класс может иметь как абстрактные, так и конкретные реализации методов", 0),
        new Answer("Интерфейс может быть реализован несколькими классами, а наследование возможно только от одного абстрактного класса", 0),
        new Answer("Нет правильного ответа", 0)
    ]),
 
];
 
//Сам тест
const quiz = new Quiz(1, questions, results);




 
//Обновление теста
function Update()
{
   //Проверяем, есть ли ещё вопросы
   if(quiz.current < quiz.questions.length)
   {
       //Если есть, меняем вопрос в заголовке
       head.innerHTML = quiz.questions[quiz.current].text;
 
       //Удаляем старые варианты ответов
       buttons.innerHTML = "";
 
       //Создаём кнопки для новых вариантов ответов
       for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
       {
           let btn = document.createElement("button");
           btn.className = "button";
 
           btn.innerHTML = quiz.questions[quiz.current].answers[i].text;
 
           btn.setAttribute("index", i);
 
           buttons.appendChild(btn);
       }
      
       //Выводим номер текущего вопроса
       pages.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;
 
       //Вызываем функцию, которая прикрепит события к новым кнопкам
       Init();
   }
   else
   {
       //Если это конец, то выводим результат
       buttons.innerHTML = "";
       head.innerHTML = quiz.results[quiz.result].text;
       pages.innerHTML = "Очки: " + quiz.score;
   }
}
 
function Init()
{
   //Находим все кнопки
   let btns = document.getElementsByClassName("button");
 
   for(let i = 0; i < btns.length; i++)
   {
       //Прикрепляем событие для каждой отдельной кнопки
       //При нажатии на кнопку будет вызываться функция Click()
       btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
   }
}
 
function Click(index)
{
   //Получаем номер правильного ответа
   let correct = quiz.Click(index);
 
   //Находим все кнопки
   let btns = document.getElementsByClassName("button");
 
   //Делаем кнопки серыми
   for(let i = 0; i < btns.length; i++)
   {
       btns[i].className = "button button_passive";
   }
 
   //Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
   if(quiz.type == 1)
   {
       if(correct >= 0)
       {
           btns[correct].className = "button button_correct";
       }
 
       if(index != correct)
       {
           btns[index].className = "button button_wrong";
       }
   }
   else
   {
       //Иначе просто подсвечиваем зелёным ответ пользователя
       btns[index].className = "button button_correct";
   }
 
   //Ждём секунду и обновляем тест
   setTimeout(Update, 1000);
}
Update();