// Система вывода результата
// У нас есть какое-то хранилище, куда складывается результат в виде числа
// За каждым ответом стоит число, которое мы после выбора прибавляем к результату
// По итогу мы считаем, что ты "ангельское, но героическое молочко", если у тебя от 0 до 3, а если от 15 до 18 — ты "варенец"


let resultCount = 0;
let currentQuestion = 0;

initTest();

function initTest() {
	document.getElementById('js-totalQuestionCount').innerText = questions.length;
	setQuestionData();
}

function setQuestionData() {
	document.getElementById('js-questionText').innerText = questions[currentQuestion].questionText;
	document.getElementById('js-questionNumber').innerText = currentQuestion + 1;
	document.getElementById('js-answers').innerHTML = getAnswersMarkdown(questions[currentQuestion].answers);
}

function getAnswersMarkdown(answers) {
	let result = '';

	answers.forEach(answer => {
		result += '<li><button class="button" onclick="onAnswerClick(' + answer.value + ')">' + answer.answerText + '</button></li>';
	})

	return result;
}

function onAnswerClick(answerValue) {
	resultCount += answerValue;
	currentQuestion++;

	if (currentQuestion < questions.length) {
		setQuestionData();
	} else {
		showResult();
	}
}

function showResult() {
	document.getElementById('js-question').classList.add('-hidden');
	document.getElementById('js-result').classList.remove('-hidden');

	let result;

	if (resultCount === 0) {
		result = resultData.carry;
	} else if (resultCount === 1){
		result = resultData.mid;
	} else if (resultCount === 2){
		result = resultData.offlane;
	} else if (resultCount === 3){
		result = resultData.support4;
	} else if (resultCount === 4){
		result = resultData.support5;
	}

	document.getElementById('js-resultTitle').innerText = result.title;
	document.getElementById('js-resultImage').src = result.image;
	document.getElementById('js-resultDescription').innerText = result.desc;

	document.getElementById('js-resultShare').innerHTML = VK.Share.button(
		{
			url:'https://geometrydash2005.github.io/test/',
			title: result.title,
			image: result.Image,
			noprse: true
		},
		{
			type: 'round',
			text: 'dctv ghbdtn'
		}
	);
}

function restartTest() {
	document.getElementById('js-result').classList.add('-hidden');
	resultCount = 0;
	currentQuestion = 0;
	initTest();
	document.getElementById('js-question').classList.remove('-hidden');
}