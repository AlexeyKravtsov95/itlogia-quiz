(function () {
    const Answer = {
        testId: null,
        quiz: null,
        rightAnswer: [],
        userAnswer: [],

        init() {
            const url = new URL(location.href);
            this.testId = url.searchParams.get('id');
            const param = url.searchParams.get('userAnswer');

            if (param) {
                try {
                    this.userAnswer = JSON.parse(param) || [];
                } catch (e) {
                    this.userAnswer = [];
                }
            }

            if (this.testId) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', `https://testologia.ru/get-quiz?id=${(this.testId)}`, false);
                xhr.send();

                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.quiz = JSON.parse(xhr.responseText);
                    } catch (e) {
                        location.href = 'index.html';
                    }
                    this.getAnswers()
                    this.showListAnswer()
                    this.prevBack()
                }else {
                    location.href = 'index.html';
                }
            }
        },

        getAnswers() {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `https://testologia.ru/get-quiz-right?id=${(this.testId)}`, false);
            xhr.send();
            if (this.testId) {
                if (xhr.status === 200 && xhr.responseText) {
                    try {
                        this.rightAnswer = JSON.parse(xhr.responseText);
                    } catch (e) {
                        console.log(e.message);
                    }
                }else {
                    console.log(xhr.status);
                }
            }
        },

        getUserAnswer(questionId) {
            const answer = this.userAnswer.find((x) => x.questionId === questionId);
            return answer ? Number(answer.chosenAnswerId) : null;
        },

        isRightAnswer(answerId) {
            return this.rightAnswer.includes(answerId);
        },

        showListAnswer() {
            const testName = document.getElementById('test-name');
            const questionContainer = document.getElementById('question-container');

            testName.innerText = this.quiz.name;
            questionContainer.innerHTML = ''

            this.quiz.questions.forEach((item, index) => {
                const questionTitleElement = document.createElement('div');
                const userChoice = this.getUserAnswer(item.id);
                questionTitleElement.className = 'common-question-title';
                questionTitleElement.innerHTML = `<span>Вопрос: ${index+1}</span> ${item.question}`
                questionContainer.appendChild(questionTitleElement);

                const optionsContainer = document.createElement('div');
                optionsContainer.className = 'answer-question-options';

                item.answers.forEach(answer => {
                    const optionElement = document.createElement('div');
                    optionElement.className = 'answer-question-option';

                    const inputId = `answer-${item.id}-${answer.id}`
                    const inputElement = document.createElement('input');
                    inputElement.setAttribute('id', inputId);
                    inputElement.setAttribute('type', 'radio')
                    inputElement.setAttribute('name', `answer-${item.id}`);
                    inputElement.setAttribute('value', answer.id);

                    const labelElement = document.createElement('label');
                    labelElement.setAttribute('for', inputId);
                    labelElement.innerText = answer.answer;

                    if (userChoice === answer.id) {
                        inputElement.checked = true;
                        optionElement.classList.add(this.isRightAnswer(answer.id) ? 'right' : 'wrong');
                    }

                    optionElement.appendChild(inputElement);
                    optionElement.appendChild(labelElement);
                    optionsContainer.appendChild(optionElement);
                });
                questionContainer.appendChild(optionsContainer);
            });
        },

        prevBack() {
            const url = new URL(location.href);
            const id = url.searchParams.get('id');
            const score = url.searchParams.get('score');
            const total = url.searchParams.get('total');
            const param = url.searchParams.get('userAnswer');

            document.getElementById('prev-back').onclick = function () {
                location.href = `result.html?score=${score}&total=${total}&id=${id}&userAnswer=${param}`;
            }
        }
    }

    Answer.init();
})()