[DEMO](https://masawik.github.io/table-component/)

## тз
##### Необходимо разработать javascript-компонент для построения таблицы с дополнительными возможностями для пользователя.
+ Клиентская пагинация: данные необходимо отображать постранично, максимум 50 элементов на страницу, необходимо предоставить пользовательскую навигацию для перехода по страницам.

+ Сортировка по столбцам: при нажатии на название столбца строки таблицы сортируются по возрастанию, при повторном клике - по убыванию.

+ Фильтрация: компонент предоставляет текстовое поле, в которое пользователь может ввести текст и строки таблицы, данные которых не содержат подстроку, введённую пользователем, скрываются. Перефильтрация осуществляется на каждое изменение значения поля.

---
---
компонент принимает следующие параметры:
<br>title - необязательный. Это caption таблицы
<br>headerFields - экземпляр класса Map, где ключи это ключи столбцов а значения это выводимый текст для этого столбца в шапке таблицы
<br>values - массив объектов со значениями строк таблицы, где ключи это ключи столбцов а значения это значения

<br>- данные лежат в src/[users.json](https://github.com/masawik/table-component/blob/main/src/users.json)
<br>- поиск реализован перебором всех полей регулярным выражением
<br>- сортировка методом sort
<br>- кроме стандартных инструментов create-react-app использовал classnames.
