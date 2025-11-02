(function (){
    const Result = {
        init() {
            const url = new URL(location.href);
            const id = url.searchParams.get('id');
            const score = url.searchParams.get('score');
            const total = url.searchParams.get('total');
            const userAnswer = url.searchParams.get('userAnswer');
            document.getElementById('result-score').innerText = url.searchParams.get('score') + '/' + url.searchParams.get('total');
            document.getElementById('answer-result').onclick = function () {
                location.href = `answer.html?score=${score}&total=${total}&id=${id}&userAnswer=${userAnswer}`;
            }
        }
    }

    Result.init();
})()